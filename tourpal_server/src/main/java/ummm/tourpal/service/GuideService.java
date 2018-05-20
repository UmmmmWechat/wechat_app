package ummm.tourpal.service;

import ummm.tourpal.entity.*;

import java.util.List;

public interface GuideService {
    boolean queryIfNew(String code);

    int signUp(GuidePre guidePre);

    Guide login(String code);

    ResultMessage modifyGuideInfo(GuideModify guideModify);

    ResultMessage acceptOrder(int orderId);

    ResultMessage rejectOrder(int orderId);

    List<Order> queryOrders(int guideId, State state, int lastIndex);

    List<Order> queryOrdersByKeyword(int guideId, String keyword, int lastIndex);
}
