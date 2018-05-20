package ummm.tourpal;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ummm.tourpal.dao.GuideRepository;
import ummm.tourpal.dao.SpotRepository;
import ummm.tourpal.service.TouristService;
import ummm.tourpal.service.TouristServiceImpl;

import java.io.File;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TourpalApplicationTests {
    @Autowired
    private SpotRepository spotRepository;

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private TouristService touristService;

    @Test
    public void contextLoads() {
//        Spot spot = new Spot();
//        spot = spotRepository.saveAndFlush(spot);
//
//        Guide guide = new Guide();
//        List<Integer> favorSpots = new ArrayList<>();
//
//        favorSpots.add(spot.getId());
//        guide.setFavorSpots(favorSpots);
//
//        guide = guideRepository.saveAndFlush(guide);
    }

}
