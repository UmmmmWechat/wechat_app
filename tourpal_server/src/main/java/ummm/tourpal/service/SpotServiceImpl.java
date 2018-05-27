package ummm.tourpal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ummm.tourpal.dao.SpotRepository;
import ummm.tourpal.entity.Location;
import ummm.tourpal.entity.Spot;
import ummm.tourpal.util.NumberUtil;

import java.util.List;

@Service
public class SpotServiceImpl implements SpotService {
    @Autowired
    private SpotRepository spotRepository;

    @Override
    public List<Spot> querySpots(Location location, int lastIndex) {
        int limit = (lastIndex == NumberUtil.ALL_INDEX) ? Integer.MAX_VALUE : lastIndex + NumberUtil.SEARCH;

        List<Spot> spots = spotRepository.findByProvinceAndCityAndRegion(location.getProvince(), location.getCity(), location.getRegion(), limit);

        if (spots.size() >= limit)
            return spots.subList(lastIndex, limit);

        List<Spot> moreSpots = spotRepository.findByProvinceAndCity(location.getProvince(), location.getCity(), location.getRegion(), limit - spots.size());

        spots.addAll(moreSpots);

        if (spots.size() >= limit)
            return spots.subList(lastIndex, limit);

        return spots;
    }

    @Override
    public List<Spot> querySpotsByKeyword(String keyword, int lastIndex) {
        if (lastIndex == NumberUtil.ALL_INDEX)
            return spotRepository.findByKeyword(keyword, Integer.MAX_VALUE);

        int limit = lastIndex + NumberUtil.SEARCH;

        List<Spot> spots = spotRepository.findByKeyword(keyword, limit);

        int size = spots.size();

        if (size >= limit)
            return spots.subList(lastIndex, limit);

        return spots.subList(lastIndex, size);
    }
}
