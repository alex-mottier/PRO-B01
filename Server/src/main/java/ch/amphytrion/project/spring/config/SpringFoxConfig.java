package ch.amphytrion.project.spring.config;

import ch.amphytrion.project.controller.BaseController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.PathSelectors.regex;

/**
 * Configuration of the Spring Framework
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Configuration
@EnableSwagger2
public class SpringFoxConfig {

    private static final String ALL_CHILD = ".*";

    /**
     *
     * @return ApiInfo
     */
    private ApiInfo metadata() {
        return new ApiInfoBuilder().title("Amphytrion API Documentation").description("API reference guide for developers")
                .termsOfServiceUrl("https://www.SiTuLisCaCEstQueTuRelisBienLeCodeDoncMerci.com/").contact(new Contact("", "", "admin@amphytrion.com"))
                .version("1.0").build();
    }

    /**
     *
     * @return Docket
     */
    @Bean
    public Docket itemApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("Item API").apiInfo(metadata()).select()
                .paths(regex(BaseController.ROOT_PATH + ALL_CHILD)).build();

    }

}
