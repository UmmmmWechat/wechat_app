package ummm.tourpal.service;

import org.springframework.stereotype.Service;
import ummm.tourpal.entity.Location;
import ummm.tourpal.entity.Spot;

import java.util.List;

@Service
public class SpotServiceImpl implements SpotService {
    @Override
    public List<Spot> querySpots(Location location, int lastIndex) {
        return null;
    }

    @Override
    public List<Spot> querySpotsByKeyword(String keyword, int lastIndex) {
        return null;
    }
}
