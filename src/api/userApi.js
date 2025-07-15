import httpRequest from "@/axios/axiosConfig";

/**
 * Get RSA public key
 */
export async function getRsaPublicKey() {
    return await httpRequest.get('/rsa-pks');
}

/**
 * Register a new user
 */
export async function addUser(params) {
    return await httpRequest.post('/users', params);
}

/**
 * User login (Single token)
 */
export async function getUserToken(params) {
    return await httpRequest.post('/user-tokens', params);
}

/**
 * User login (Dual token)
 */
export async function getUserTokenAndRefreshToken(params) {
    return await httpRequest.post('/user-dts', params);
}

/**
 * Get basic user information
 */
export async function getUserBasicInfo() {
    return await httpRequest.get('/users');
}

/**
 * Update user information
 */
export async function updateUser(params) {
    return await httpRequest.put('/users', params);
}

/**
 * Logout user
 */
export async function logout() {
    return await httpRequest.delete('/refresh-tokens');
}

/**
 * Add user followings
 */
export async function addUserFollowings(params) {
    return await httpRequest.post('/user-followings', params);
}

/**
 * Get user followings
 */
export async function getUserFollowings() {
    return await httpRequest.get('/user-followings');
}

/**
 * Update basic user information
 */
export async function updateUserInfo(params) {
    return await httpRequest.put('/user-infos', params);
}

/**
 * Search for users using Elasticsearch with pagination
 */
export async function pageListUsersByEs(params) {
    return await httpRequest.get('/search-users', { params });
}