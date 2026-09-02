import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    const cloudName = this.configService.get<string>('cloudinary.cloudName');
    const apiKey = this.configService.get<string>('cloudinary.apiKey');
    const apiSecret = this.configService.get<string>('cloudinary.apiSecret');

    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });
    }
  }

  async uploadFiles(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      return [];
    }

    const folder = this.configService.get<string>('cloudinary.folder') || 'coachly-chat';

    const uploaded = await Promise.all(
      files.map(async (file) => {
        const mime = file.mimetype || 'application/octet-stream';

        if (!this.isCloudinaryConfigured()) {
          const fallback = this.buildFallbackUrl(file);
          return {
            url: fallback,
            secureUrl: fallback,
            resourceType: mime.startsWith('audio/')
              ? 'video'
              : mime.startsWith('video/')
                ? 'video'
                : 'image',
            mimeType: mime,
            fileName: file.originalname || 'upload',
            size: file.size || 0,
            publicId: null,
            duration: null,
          };
        }

        const source = file.path
          ? file.path
          : `data:${mime};base64,${file.buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(source, {
          folder,
          resource_type: 'auto',
          eager: [{ quality: 'auto', fetch_format: 'auto' }],
        });

        return {
          url: result.secure_url || result.url,
          secureUrl: result.secure_url || result.url,
          resourceType: result.resource_type || 'auto',
          mimeType: mime,
          fileName: file.originalname || 'upload',
          size: result.bytes || file.size || 0,
          publicId: result.public_id || null,
          duration: result.duration || null,
        };
      }),
    );

    return uploaded;
  }

  private buildFallbackUrl(file: Express.Multer.File) {
    if (file.path) {
      return file.path;
    }

    return file.buffer
      ? `data:${file.mimetype || 'application/octet-stream'};base64,${file.buffer.toString('base64')}`
      : '';
  }

  private isCloudinaryConfigured() {
    return !!(
      this.configService.get<string>('cloudinary.cloudName') &&
      this.configService.get<string>('cloudinary.apiKey') &&
      this.configService.get<string>('cloudinary.apiSecret')
    );
  }
}
