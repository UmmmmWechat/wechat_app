package ummm.tourpal.service;

import ummm.tourpal.entity.Spot;

import java.util.List;

public interface SpotService {
    List<Spot> querySpots(String province, String city, int lastIndex);

    List<Spot> querySpotsByKeyword(String keyword, int lastIndex);
}
