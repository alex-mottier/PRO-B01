package ch.amphytrion.project.DTO;

import ch.amphytrion.project.dto.DatesFilterDTO;
import org.joda.time.DateTime;
import org.junit.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

/**
 * Test of DatesFilterDTO class
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
public class DatesFilterDTOTest {


    private DateTime now;
    private DateTime oneSecAfter;
    private DateTime oneSecBefore;
    private DateTime oneYearAfter;
    private DateTime oneYearBefore;
    private String sNow;
    private String sOneSecAfter;
    private String sOneSecBefore;
    private String sOneYearAfter;
    private String sOneYearBefore;
    private DatesFilterDTO filter;
     @Before
     public void init() {
         now = DateTime.now();
         oneSecAfter = now.plusSeconds(1);
         oneSecBefore = now.minusSeconds(1);
         oneYearAfter = now.plusYears(1);
         oneYearBefore = now.minusYears(1);
         sNow = now.toString();
         sOneSecAfter = oneSecAfter.toString();
         sOneSecBefore = oneSecBefore.toString();
         sOneYearAfter = oneYearAfter.toString();
         sOneYearBefore = oneYearBefore.toString();
     }

    /**
     * Test if two dates are between two another
     */
    @Test
    public void twoDatesAndIsBetweenTest(){

        filter = new DatesFilterDTO(sOneYearBefore, sOneYearAfter);
        assertEquals( new DatesFilterDTO(now.toString(), oneSecAfter.toString())
                            .isBetween(filter),
                true);
    }

    /**
     * Test start date between two another
     */
    @Test
    public void startDateAndIsBetweenTest(){
        filter = new DatesFilterDTO(sOneYearBefore, "");
        assertEquals( new DatesFilterDTO(now.toString(), oneSecAfter.toString())
                            .isBetween(filter),
                true);
    }

    /**
     * Test end date between two another
     */
    @Test
    public void endDateAndIsBetweenTest(){
        filter = new DatesFilterDTO("", sOneYearAfter);
        assertEquals( new DatesFilterDTO(now.toString(), oneSecAfter.toString())
                            .isBetween(filter),
                true);
    }
    /**
     * Test with no date
     */
    @Test
    public void noDateTest(){
        filter = new DatesFilterDTO("", "");
        assertEquals( new DatesFilterDTO(now.toString(), oneSecAfter.toString())
                        .isBetween(filter),
                true);

    }

    /**
     * Test with two date not between two another
     */
    @Test
    public void twoDatesNotBetweenTest(){
        filter = new DatesFilterDTO(sOneYearBefore, sOneSecAfter);
        assertNotEquals( new DatesFilterDTO(sOneYearBefore, sOneYearAfter)
                        .isBetween(filter),
                true);
    }

    /**
     * Test with start date not between two another
     */
    @Test
    public void startDateNotBetweenTest(){
        filter = new DatesFilterDTO(sNow, "");
        assertNotEquals( new DatesFilterDTO(sOneYearBefore, sOneSecBefore)
                        .isBetween(filter),
                true);

    }
    /**
     * Test with end date not between two another
     */
    @Test
    public void endDateNotBetweenTest(){
        filter = new DatesFilterDTO("", sNow);
        assertNotEquals( new DatesFilterDTO(sOneSecAfter, sOneYearAfter)
                        .isBetween(filter),
                true);
    }
}
