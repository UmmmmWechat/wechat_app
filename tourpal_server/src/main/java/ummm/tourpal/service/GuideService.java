package ummm.tourpal.service;

import ummm.tourpal.entity.Order;

import java.util.List;

public interface GuideService {
    boolean queryIfNew(String code);

    long signUp(Object form);

    boolean acceptOrder(long orderId);

    boolean rejectOrder(long orderId);

    List<Order> queryOrders(long guideId, String state, long lastIndex);

    List<Order> queryOrdersByKeyword(long guideId, String keyword, long lastIndex);
}
