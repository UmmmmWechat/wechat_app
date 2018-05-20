package ummm.tourpal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ummm.tourpal.dao.GuideRepository;
import ummm.tourpal.dao.OrderRepository;
import ummm.tourpal.dao.TouristRepository;
import ummm.tourpal.entity.Feedback;
import ummm.tourpal.entity.Guide;
import ummm.tourpal.entity.Order;
import ummm.tourpal.entity.Tourist;

import java.util.List;

@Service
public class TouristServiceImpl implements TouristService {
    @Autowired
    private TouristRepository touristRepository;

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public int login(String code) {
        String openId = null;

        //TODO（根据code拿openId）

        Tourist tourist = touristRepository.findByOpenId(openId);

        if (tourist == null) {
            //TODO (完善tourist)
        }

        return tourist.getId();
    }

    @Override
    public Tourist queryById(int id) {
        return touristRepository.findById(id).get();
    }

    @Override
    public List<Guide> queryGuideBySpot(int spotId, int lastIndex) {
        if (lastIndex == -1)
            return guideRepository.findByFavorSpots(spotId, Integer.MAX_VALUE);

        List<Guide> guides = guideRepository.findByFavorSpots(spotId, lastIndex + 10);

        int size = guides.size();

        if (size - lastIndex < 10)
            return guides.subList(lastIndex, size);

        return guides.subList(lastIndex, lastIndex + 10);
    }

    @Override
    public List<Guide> queryGuideByKeyword(String keyword, int lastIndex) {
        if (lastIndex == -1)
            return guideRepository.findByKeyword(keyword, Integer.MAX_VALUE);

        List<Guide> guides = guideRepository.findByKeyword(keyword, lastIndex + 10);

        int size = guides.size();

        if (size - lastIndex < 10)
            return guides.subList(lastIndex, size);

        return guides.subList(lastIndex, lastIndex + 10);
    }

    @Override
    public int inviteGuide(int touristId, int spotId, int guideId, String message) {
        Order order = new Order();

        order.setTouristId(touristId);
        order.setTouristName(touristRepository.findById(touristId).get().getName());
        order.setSpotId(spotId);
        order.setSpotName(touristRepository.findById(spotId).get().getName());
        order.setGuideId(guideId);
        order.setGuideName(guideRepository.findById(guideId).get().getRealName());
        order.setState("waiting");
        order.setMessage(message);

        return orderRepository.saveAndFlush(order).getId();
    }

    @Override
    public List<Order> queryOrders(int touristId, String state, int lastIndex) {
        return null;
    }

    @Override
    public List<Order> queryOrdersByKeyword(int touristId, String keyword, int lastIndex) {
        return null;
    }

    @Override
    public boolean cancelOrder(int orderId, String cancelMessage) {
        return false;
    }

    @Override
    public boolean commendOrder(int orderId, Feedback feedback) {
        return false;
    }
}
