import { AxiosError, AxiosPromise } from 'axios';
import { api } from './api';
import { UserResponseDto } from './open-api';

const _basePath = '/api';

export function getFileUrl(assetId: string, isThumb?: boolean, isWeb?: boolean) {
	const urlObj = new URL(`${window.location.origin}${_basePath}/asset/file/${assetId}`);

	if (isThumb !== undefined && isThumb !== null)
		urlObj.searchParams.append('isThumb', `${isThumb}`);
	if (isWeb !== undefined && isWeb !== null) urlObj.searchParams.append('isWeb', `${isWeb}`);

	return urlObj.href;
}

export type ApiError = AxiosError<{ message: string }>;

export const oauth = {
	isCallback: (location: Location) => {
		const search = location.search;
		return search.includes('code=') || search.includes('error=');
	},
	getConfig: (location: Location) => {
		const redirectUri = location.href.split('?')[0];
		console.log(`OAuth Redirect URI: ${redirectUri}`);
		return api.oauthApi.generateConfig({ redirectUri });
	},
	login: (location: Location) => {
		return api.oauthApi.callback({ url: location.href });
	},
	link: (location: Location): AxiosPromise<UserResponseDto> => {
		return api.oauthApi.link({ url: location.href });
	},
	unlink: () => {
		return api.oauthApi.unlink();
	}
};
