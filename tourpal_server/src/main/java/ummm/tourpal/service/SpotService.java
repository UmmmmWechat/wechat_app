package ummm.tourpal.service;

import ummm.tourpal.entity.Location;
import ummm.tourpal.entity.Spot;

import java.util.List;

public interface SpotService {
    List<Spot> querySpots(Location location, long lastIndex);

    List<Spot> querySpotsByKeyword(String keyword, long lastIndex);
}
