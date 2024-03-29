﻿angular.module('portal.services.identityCache').
    service('IdentityCache', function(lodash, userClaims) {
        'use strict';
        var accessTokenKey = 'accessToken';
        var _accessToken = localStorage.getItem(accessTokenKey);
        var _identity = null;

        return {
            isAuth: function() {
                return !!_identity;
            },

            setAccessTokens: function(accessToken) {
                _accessToken = accessToken;
                localStorage.setItem(accessTokenKey, accessToken);
            },

            clearAccessTokens: function () {
                _accessToken = undefined;
                localStorage.removeItem(accessTokenKey);
            },

            getAccessToken: function() {
                return _accessToken;
            },

            identity: function () {
                //TODO: Should the cache expire after a time?
                return _identity;
            },

            setIdentity: function(identity) {
                _identity = identity;
            },

            hasRole: function (role) {
                if (!_identity) {
                    return false;
                }
                var result = lodash.find(_identity.roles, { name: role });

                return (result === undefined) ? false : true;
            },

            businesses: function() {
                if (!_identity) {
                    return [];
                }

                var claims = lodash.chain(_identity.claims).filter({ name: userClaims.ViewBusiness }).map('value').value();
                return claims;
            }
        };
});