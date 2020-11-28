package com.masterpiece.jwtauthserver;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory;

import com.masterpiece.jwtauthserver.services.UserDetailsService;

public class JwtAuthServerConfig extends AuthorizationServerConfigurerAdapter {
	@Value("${jwt-auth-server.keyStore}")
    private String keyStore;

    @Value("${jwt-auth-server.keyPass}")
    private String keyPass;

    @Value("${jwt-auth-server.keyAlias}")
    private String keyAlias;

    private final AuthenticationManager authenticationManagerBean;


    private final UserDetailsService userDetailsService;

    protected JwtAuthServerConfig(
	    AuthenticationManager authenticationManagerBean,
	    UserDetailsService userDetailsService) {
	this.authenticationManagerBean = authenticationManagerBean;
	this.userDetailsService = userDetailsService;
    }

    /**
     * Token store, but not really a store, can read and write JWT.
     */
    @Bean
    public TokenStore tokenStore() {
	return new JwtTokenStore(accessTokenConverter());
    }

    /**
     * A token converter for JWT and specifies a signing key.
     */
    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
	JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
	Resource resource = new ClassPathResource(keyStore);
	char[] password = keyPass.toCharArray();
	KeyStoreKeyFactory factory = new KeyStoreKeyFactory(resource, password);
	converter.setKeyPair(factory.getKeyPair(keyAlias));
	return converter;
    }

    /**
     * Token management.
     */
    @Bean
    public DefaultTokenServices tokenServices() {
	DefaultTokenServices services = new DefaultTokenServices();
	services.setTokenStore(tokenStore());
	services.setSupportRefreshToken(true); // If required
	return services;
    }

    /**
     * All in one.
     */
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer configurer)
	    throws Exception {
	configurer.tokenStore(tokenStore())
		.accessTokenConverter(accessTokenConverter())
		.authenticationManager(authenticationManagerBean)
		// Configure with custom user details service
		.userDetailsService(userDetailsService);
    }

    /**
     * Change authorization server security. More likely specific endpoints.
     */
    @Override
    public void configure(AuthorizationServerSecurityConfigurer configurer)
	    throws Exception {
	// Indicate that an authenticated client can get the public key
	configurer.tokenKeyAccess("isAuthenticated()");
	// To decode the access token, denied by default
	// Indicate that an authenticated client can check tokens
	configurer.checkTokenAccess("isAuthenticated()");
    }

}
