package com.example.spring.config;

import com.example.controller.BaseController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


/*
@Configuration
@EnableSwagger2
@Import({springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration.class})
public class SpringFoxConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiEndpointsInfo())
                .tags(
                        new Tag("Amphytrion", "PRO - Application project")
                );
    }
    private ApiInfo apiEndpointsInfo() {
        return new ApiInfoBuilder().title("Amphytrion API documentation")
                .description("take a look at README.md")
                .version("1.0.0")
                .build();
    }
}*/
import static springfox.documentation.builders.PathSelectors.regex;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SpringFoxConfig {

    private static final String ALL_CHILD = ".*";

    private ApiInfo metadata() {
        return new ApiInfoBuilder().title("Amphytrion API Documentation").description("API reference guide for developers")
                .termsOfServiceUrl("https://www.SiTuLisCaCEstQueTuRelisBienLeCodeDoncMerci.com/").contact(new Contact("", "", "admin@amphytrion.com"))
                .version("1.0").build();
    }

    @Bean
    public Docket itemApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("Item API").apiInfo(metadata()).select()
                .paths(regex(BaseController.ROOT_PATH + ALL_CHILD)).build();

    }

}
