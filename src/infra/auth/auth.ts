import { KeyObject, createPublicKey, verify } from 'crypto';
import { IncomingHttpHeaders } from 'http';
import { CONFIG } from '../config/config';

export const getPublicKey = () => {
  const key =
    '-----BEGIN RSA PUBLIC KEY-----\n' +
    CONFIG.PARAMS.GRAPHQL.GRAPHQL_GATEWAY_PUBLIC_KEY +
    '\n-----END RSA PUBLIC KEY-----';

  return createPublicKey({
    key: Buffer.from(key),
  });
};

export const verifySignature = (data: Buffer, signature: Buffer) =>
  verify(null, data, getPublicKey(), signature);

type Header = string | string[] | undefined;

function headerAsString(header: Header): string {
  if (typeof header === 'string') {
    return header;
  }
  return '';
}

export const checkAuth = (headers: IncomingHttpHeaders) => {
  const userId = headers['user-id'];
  const data = [userId, headers.scopes, headers['sign-date']].join(',');
  const verifyData = Buffer.from(data);
  const signature = Buffer.from(headerAsString(headers.signature), 'base64');

  if (!verifySignature(verifyData, signature)) {
    if (CONFIG.PARAMS.APP.ENV !== 'dev') {
      const message = 'Provided signature is not valid';
      throw new Error(message);
    }
  }

  return true;
};
