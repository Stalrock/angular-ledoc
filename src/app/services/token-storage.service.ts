import { Injectable } from '@angular/core';

import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class TokenStorageService {

  constructor(
    private lss: LocalStorageService) {
  }

  /**
   * Set the token in the service and in the localStorage
   */
  public setToken(token: string): void {
    this.lss.store('auth_token', token);
  }

  /**
   * Get the token from the service or from the localStorage if not found
   */
  public getToken(): string {
    return this.lss.retrieve('auth_token');
  }

  /**
   * Remove the token from the service and from the localStorage
   *
   */
  public deleteToken(): void {
    this.lss.clear('auth_token');
  }

  /**
   * Check if token is set in the service or in the localStorage
   */
  public hasToken(): boolean {
    return this.lss.retrieve('auth_token') && this.lss.retrieve('auth_token').length;
  }

  /**
   * Check if token is set in the localStorage
   */
  public isAuthenticate(): boolean {
    return !!this.lss.retrieve('auth_token');
  }

  /**
   * Disconnect user by delete token and account type
   */
  public disconnect() {
    this.deleteToken();
  }
  /**
   * Get user info
   */

  public getInfo(data: string) {
    const decodeToken = this.decodeToken(this.getToken());
    if (decodeToken.hasOwnProperty(data)) {
      return decodeToken[data];
    }
  }

  /**
   * Method designed by Mozilla to avoid errors on non-unicode chars while base64 encryption
   * ref: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
   */
  public b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(parseInt('0x' + p1, 16));
      }));
  }

  /**
   * Method used to decode Base64 in JWT token
   */
  private urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        throw new Error('Illegal base64url string');
      }
    }
    return decodeURIComponent(encodeURI(window.atob(output)));
  }

  /**
   * Decodes a full JWT token
   */
  public decodeToken(token: string) {
    if (typeof token !== 'string') {
      throw new Error('JWT must have string type');
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }
}