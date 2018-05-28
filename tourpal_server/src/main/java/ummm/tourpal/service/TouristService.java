package ummm.tourpal.service;

import ummm.tourpal.entity.*;

import java.util.List;

public interface TouristService {
    int login(String code);

    Tourist queryById(int id);

    List<Guide> queryGuideBySpot(int spotId, int lastIndex);

    List<Guide> queryGuideByKeyword(String keyword, int lastIndex);

    int inviteGuide(OrderPre orderPre);

    List<Order> queryOrders(int touristId, State state, int lastIndex);

    List<Order> queryOrdersByKeyword(int touristId, String keyword, int lastIndex);

    ResultMessage cancelOrder(int orderId, String cancelMessage);

    ResultMessage commendOrder(int orderId, Feedback feedback);
}
