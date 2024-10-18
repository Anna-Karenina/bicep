import { Injectable } from '@nestjs/common';
import { OneSignalService } from 'onesignal-api-client-nest';
import { NotificationBySegmentBuilder } from 'onesignal-api-client-core';

@Injectable()
export class PushService {
  constructor(private readonly oneSignalService: OneSignalService) {}
  // API: https://github.com/kvandake/onesignal
  async viewNotifications() {
    return await this.oneSignalService.viewNotifications({
      limit: 1,
      kind: 1,
      offset: 0,
    });
  }

  async createNotification(message: string) {
    const input = new NotificationBySegmentBuilder()
      .setIncludedSegments(['Active Users', 'Inactive Users'])
      .notification() // .email()
      .setContents({ en: message })
      .build();

    await this.oneSignalService.createNotification(input);
  }
}
