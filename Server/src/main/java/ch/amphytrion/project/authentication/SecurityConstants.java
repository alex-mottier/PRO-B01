package ch.amphytrion.project.authentication;

public class SecurityConstants {
    public static long EXPIRATION_TIME = 1000 * 60 * 30; // 30 minutes
    public static String SECRET = "AmPhYtRiOnIsWhAtThEwOrLdNeEdS";
    public static String HEADER_STRING = "SESSION_TOKEN_AMPHITRYON";
    public static String TOKEN_PREFIX = "Session:";
    public static String SIGN_UP_URL = "/item/signUpStudent";
}
