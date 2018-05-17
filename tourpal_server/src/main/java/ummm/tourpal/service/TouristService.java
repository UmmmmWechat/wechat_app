package ummm.tourpal.service;

import ummm.tourpal.entity.Feedback;
import ummm.tourpal.entity.Guide;
import ummm.tourpal.entity.Order;
import ummm.tourpal.entity.Tourist;

import java.util.List;

public interface TouristService {
    int login(String code);

    Tourist queryById(int id);

    List<Guide> queryGuideBySpot(int spotId, int lastIndex);

    public List<Guide> queryGuideByKeyword(String keyword, int lastIndex);

    int inviteGuide(int touristId, int spotId, int guideId, String message);

    List<Order> queryOrders(int touristId, String state, int lastIndex);

    List<Order> queryOrdersByKeyword(int touristId, String keyword, int lastIndex);

    boolean cancelOrder(int orderId, String cancelMessage);

    boolean commendOrder(int orderId, Feedback feedback);
}
