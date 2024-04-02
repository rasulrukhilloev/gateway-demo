/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface TokenValidResult {
  isValid: boolean;
  decoded?: DecodedToken | undefined;
  error?: string | undefined;
}

export interface DecodedToken {
  userId: number;
  iat: number;
  exp: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthEntity {
  accessToken: string;
}

export interface Empty {
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  login(request: LoginDto): Observable<AuthEntity>;

  /** rpc RefreshToken() returns (); */

  authenticate(request: AuthEntity): Observable<TokenValidResult>;
}

export interface AuthServiceController {
  login(request: LoginDto): Promise<AuthEntity> | Observable<AuthEntity> | AuthEntity;

  /** rpc RefreshToken() returns (); */

  authenticate(request: AuthEntity): Promise<TokenValidResult> | Observable<TokenValidResult> | TokenValidResult;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "authenticate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
