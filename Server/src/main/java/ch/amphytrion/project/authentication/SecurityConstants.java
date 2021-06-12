package ch.amphytrion.project.authentication;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
public class SecurityConstants {
    public static long EXPIRATION_TIME = 1000 * 60 * 30; // 30 minutes
    public static String SECRET = "AmPhYtRiOnIsWhAtThEwOrLdNeEdS";
    public static String HEADER_STRING = "session_token_amphitryon";
    public static String TOKEN_PREFIX = "Bearer ";
    public static String SIGN_UP_URL_STUDENT = "/signUpStudent";
    public static String SIGN_UP_URL_HOST = "/signUpHost";
    public static String LOGIN_URL = "/login";
}
