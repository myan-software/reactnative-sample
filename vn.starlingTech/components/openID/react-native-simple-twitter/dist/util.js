import HmacSHA1 from 'crypto-js/hmac-sha1';
import * as Base64 from 'crypto-js/enc-base64';
export const randomStrings = (n = 32) => {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array(...Array(n))
    .map(() => str.charAt(Math.floor(Math.random() * str.length)))
    .join('');
};
export const createHeaderString = (params) =>
  `OAuth ${Object.keys(params)
    .sort()
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join(', ')}`;
export const encodeParamsToString = (params) =>
  Object.keys(params)
    .sort()
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join('&');
export const parseFormEncoding = (formEncoded) =>
  formEncoded.split('&').reduce((obj, form) => {
    const [key, value] = form.split('=');
    return {...obj, [key]: value};
  }, {});
export const createTokenRequestHeaderParams = (
  consumerKey,
  {callback, token, params},
) => ({
  ...(callback ? {oauth_callback: callback} : {}),
  oauth_consumer_key: consumerKey,
  oauth_nonce: randomStrings(),
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: new Date().getTime() / 1000,
  ...(token ? {oauth_token: token} : {}),
  oauth_version: '1.0',
  ...params,
});
export const createSignature = (
  params,
  method,
  url,
  consumerSecret,
  tokenSecret,
) => {
  const encodedParameters = encodeParamsToString(params)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
  const encodedRequestURL = encodeURIComponent(url);
  const signature = Base64.stringify(
    HmacSHA1(
      `${method}&${encodedRequestURL}&${encodeURIComponent(encodedParameters)}`,
      tokenSecret
        ? `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(
            tokenSecret,
          )}`
        : `${encodeURIComponent(consumerSecret)}&`,
    ),
  );
  return {...params, oauth_signature: signature};
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sS0FBSyxNQUFNLE1BQU0sc0JBQXNCLENBQUM7QUFLL0MsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQVUsRUFBRTtJQUN0RCxNQUFNLEdBQUcsR0FBRyxnRUFBZ0UsQ0FBQztJQUU3RSxPQUFPLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ25HLENBQUMsQ0FBQztBQUtGLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLENBQUMsTUFBVyxFQUFVLEVBQUUsQ0FBQyxTQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFO0tBQzNGLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQzdFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBS2hCLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsTUFBVyxFQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRTtLQUNwRixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUM3RSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFLYixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFdBQW1CLEVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3pHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUNsQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFLUCxNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBRyxDQUFDLFdBQW1CLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBdUQsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4SixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2pELGtCQUFrQixFQUFFLFdBQVc7SUFDL0IsV0FBVyxFQUFFLGFBQWEsRUFBRTtJQUM1QixzQkFBc0IsRUFBRSxXQUFXO0lBQ25DLGVBQWUsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUk7SUFDNUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN4QyxhQUFhLEVBQUUsS0FBSztJQUNwQixHQUFHLE1BQU07Q0FDVixDQUFDLENBQUM7QUFLSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsQ0FBQyxNQUFjLEVBQUUsTUFBYyxFQUFFLEdBQVcsRUFBRSxjQUFzQixFQUFFLFdBQW9CLEVBQUUsRUFBRTtJQUMzSCxNQUFNLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztTQUNuRCxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUNwQixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLE1BQU0saUJBQWlCLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbEQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3pDLEdBQUcsTUFBTSxJQUFJLGlCQUFpQixJQUFJLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFDekUsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDcEksQ0FBQyxDQUFDO0lBRUgsT0FBTyxFQUFFLEdBQUcsTUFBTSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsQ0FBQztBQUNuRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBucG0gKi9cbmltcG9ydCBIbWFjU0hBMSBmcm9tICdjcnlwdG8tanMvaG1hYy1zaGExJztcbmltcG9ydCAqIGFzIEJhc2U2NCBmcm9tICdjcnlwdG8tanMvZW5jLWJhc2U2NCc7XG5cbi8qKlxuICogcmFuZG9tIHN0cmluZ3MgKGluaXRpYWwgbGVuZ3RoIC0+IDMyKVxuICovXG5leHBvcnQgY29uc3QgcmFuZG9tU3RyaW5ncyA9IChuOiBudW1iZXIgPSAzMik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHN0ciA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG5cbiAgcmV0dXJuIEFycmF5KC4uLkFycmF5KG4pKS5tYXAoKCkgPT4gc3RyLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzdHIubGVuZ3RoKSkpLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBjcmVhdGUgaGVhZGVyLkF1dGhvcml6YXRpb24gc3RyaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVIZWFkZXJTdHJpbmcgPSAocGFyYW1zOiBhbnkpOiBzdHJpbmcgPT4gYE9BdXRoICR7T2JqZWN0LmtleXMocGFyYW1zKS5zb3J0KClcbiAgLm1hcCgoa2V5KSA9PiBgJHtlbmNvZGVVUklDb21wb25lbnQoa2V5KX09JHtlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tleV0pfWApXG4gIC5qb2luKCcsICcpfWA7XG5cbi8qKlxuICogY3JlYXRlIHN0cmluZyBvYmplY3Quam9pbigmKVxuICovXG5leHBvcnQgY29uc3QgZW5jb2RlUGFyYW1zVG9TdHJpbmcgPSAocGFyYW1zOiBhbnkpOiBzdHJpbmcgPT4gT2JqZWN0LmtleXMocGFyYW1zKS5zb3J0KClcbiAgLm1hcCgoa2V5KSA9PiBgJHtlbmNvZGVVUklDb21wb25lbnQoa2V5KX09JHtlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tleV0pfWApXG4gIC5qb2luKCcmJyk7XG5cbi8qKlxuICogaWYgY29udGVudC10eXBlID09PSB0ZXh0L2h0bWwsIHBhcnNlIHJlc3BvbnNlLnRleHQoKVxuICovXG5leHBvcnQgY29uc3QgcGFyc2VGb3JtRW5jb2RpbmcgPSAoZm9ybUVuY29kZWQ6IHN0cmluZyk6IGFueSA9PiBmb3JtRW5jb2RlZC5zcGxpdCgnJicpLnJlZHVjZSgob2JqLCBmb3JtKSA9PiB7XG4gIGNvbnN0IFtrZXksIHZhbHVlXSA9IGZvcm0uc3BsaXQoJz0nKTtcbiAgcmV0dXJuIHsgLi4ub2JqLCBba2V5XTogdmFsdWUgfTtcbn0sIHt9KTtcblxuLyoqXG4gKiBjcmVhdGUgcGFyYW1zXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUb2tlblJlcXVlc3RIZWFkZXJQYXJhbXMgPSAoY29uc3VtZXJLZXk6IHN0cmluZywgeyBjYWxsYmFjaywgdG9rZW4sIHBhcmFtcyB9OiB7IGNhbGxiYWNrPzogc3RyaW5nLCB0b2tlbj86IHN0cmluZywgcGFyYW1zPzogYW55IH0pID0+ICh7XG4gIC4uLihjYWxsYmFjayA/IHsgb2F1dGhfY2FsbGJhY2s6IGNhbGxiYWNrIH0gOiB7fSksXG4gIG9hdXRoX2NvbnN1bWVyX2tleTogY29uc3VtZXJLZXksXG4gIG9hdXRoX25vbmNlOiByYW5kb21TdHJpbmdzKCksXG4gIG9hdXRoX3NpZ25hdHVyZV9tZXRob2Q6ICdITUFDLVNIQTEnLFxuICBvYXV0aF90aW1lc3RhbXA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCxcbiAgLi4uKHRva2VuID8geyBvYXV0aF90b2tlbjogdG9rZW4gfSA6IHt9KSxcbiAgb2F1dGhfdmVyc2lvbjogJzEuMCcsXG4gIC4uLnBhcmFtcyxcbn0pO1xuXG4vKipcbiAqIGNyZWF0ZSBPQXV0aDEuMCBzaWduYXR1cmUgZnJvbSBwYXJhbXNcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNpZ25hdHVyZSA9IChwYXJhbXM6IG9iamVjdCwgbWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBjb25zdW1lclNlY3JldDogc3RyaW5nLCB0b2tlblNlY3JldD86IHN0cmluZykgPT4ge1xuICBjb25zdCBlbmNvZGVkUGFyYW1ldGVycyA9IGVuY29kZVBhcmFtc1RvU3RyaW5nKHBhcmFtcylcbiAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJyk7XG4gIGNvbnN0IGVuY29kZWRSZXF1ZXN0VVJMID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG5cbiAgY29uc3Qgc2lnbmF0dXJlID0gQmFzZTY0LnN0cmluZ2lmeShIbWFjU0hBMShcbiAgICBgJHttZXRob2R9JiR7ZW5jb2RlZFJlcXVlc3RVUkx9JiR7ZW5jb2RlVVJJQ29tcG9uZW50KGVuY29kZWRQYXJhbWV0ZXJzKX1gLFxuICAgIHRva2VuU2VjcmV0ID8gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGNvbnN1bWVyU2VjcmV0KX0mJHtlbmNvZGVVUklDb21wb25lbnQodG9rZW5TZWNyZXQpfWAgOiBgJHtlbmNvZGVVUklDb21wb25lbnQoY29uc3VtZXJTZWNyZXQpfSZgLFxuICApKTtcblxuICByZXR1cm4geyAuLi5wYXJhbXMsIG9hdXRoX3NpZ25hdHVyZTogc2lnbmF0dXJlIH07XG59O1xuIl19
