package ummm.tourpal.service;

import ummm.tourpal.entity.Order;

import java.util.List;

public interface GuideService {
    boolean queryIfNew(String code);

    int signUp(Object form);

    boolean acceptOrder(int orderId);

    boolean rejectOrder(int orderId);

    List<Order> queryOrders(int guideId, String state, int lastIndex);

    List<Order> queryOrdersByKeyword(int guideId, String keyword, int lastIndex);
}
