package ummm.tourpal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import ummm.tourpal.dao.GuideRepository;
import ummm.tourpal.dao.OrderRepository;
import ummm.tourpal.entity.*;
import ummm.tourpal.util.APIUtil;
import ummm.tourpal.util.NumberUtil;

import java.util.Date;
import java.util.List;

@Service
public class GuideServiceImpl implements GuideService {
    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Cacheable(value = "guide", key = "#guide.id")
    @Override
    public boolean queryIfNew(String code) {
        return guideRepository.existsByOpenId(APIUtil.getOpenId(code));
    }

    @CachePut(value = "guide", key = "#guide.id")
    @Override
    public int signUp(GuidePre guidePre) {
        Guide guide = new Guide();

        //TODO (真实身份验证)

        guide.setOpenId(guidePre.openId);
        guide.setRealName(guidePre.realName);
        guide.setIdCard(guidePre.idCard);
        guide.setGender(guidePre.gender);
        guide.setLocation(guidePre.location);
        guide.setWechat(guidePre.wechat);
        guide.setPhone(guidePre.phone);
        guide.setIntroduction(guidePre.introduction);
        guide.setFavorSpots(guidePre.favorSpots);

        return guideRepository.saveAndFlush(guide).getId();
    }

    @Cacheable(value = "guide", key = "#guide.id")
    @Override
    public Guide login(String code) {
        return guideRepository.findByOpenId(APIUtil.getOpenId(code));
    }

    @Cacheable(value = "guide", key = "#guide.id")
    @CachePut(value = "guide", key = "#guide.id")
    @Override
    public ResultMessage modifyGuideInfo(GuideModify guideModify) {
        Guide guide = guideRepository.getOne(guideModify.id);

        guide.setLocation(guideModify.location);
        guide.setWechat(guideModify.wechat);
        guide.setPhone(guideModify.phone);
        guide.setIntroduction(guideModify.introduction);
        guide.setFavorSpots(guideModify.favorSpots);

        guideRepository.saveAndFlush(guide);

        return ResultMessage.OK;
    }

    @Cacheable(value = "order", key = "#order.id")
    @CachePut(value = "order", key = "#order.id")
    @Override
    public ResultMessage acceptOrder(int orderId) {
        return handleOrder(orderId, true);
    }

    @Cacheable(value = "order", key = "#order.id")
    @CachePut(value = "order", key = "#order.id")
    @Override
    public ResultMessage rejectOrder(int orderId) {
        return handleOrder(orderId, false);
    }

    private ResultMessage handleOrder(int orderId, boolean accept) {
        Order order = orderRepository.getOne(orderId);

        if (order.getState() == State.CANCELED)
            return ResultMessage.ALREADY_CANCELED;

        else if (order.getTravelDate().before(new Date())) {
            order.setState(State.TIMEOUT);
            orderRepository.saveAndFlush(order);
            return ResultMessage.ALREADY_TIMEOUT;
        }

        if (accept)
            order.setState(State.ONGOING);
        else
            order.setState(State.REJECTED);

        orderRepository.saveAndFlush(order);

        return ResultMessage.OK;
    }

    @Cacheable(value = "order", key = "#order.id")
    @Override
    public List<Order> queryOrders(int guideId, State state, int lastIndex) {
        if (state == State.ALL) {
            if (lastIndex == NumberUtil.ALL_INDEX)
                return orderRepository.findByGuideId(guideId, Integer.MAX_VALUE);
            else {
                int limit = lastIndex + NumberUtil.SEARCH;

                List<Order> orders = orderRepository.findByGuideId(guideId, limit);

                int size = orders.size();

                if (size >= limit)
                    return orders.subList(lastIndex, limit);

                return orders.subList(lastIndex, size);
            }
        }

        if (lastIndex == NumberUtil.ALL_INDEX)
            return orderRepository.findByGuideIdAndState(guideId, state, Integer.MAX_VALUE);

        int limit = lastIndex + NumberUtil.SEARCH;

        List<Order> orders = orderRepository.findByGuideIdAndState(guideId, state, limit);

        int size = orders.size();

        if (size >= limit)
            return orders.subList(lastIndex, limit);

        return orders.subList(lastIndex, size);
    }

    @Cacheable(value = "order", key = "#order.id")
    @Override
    public List<Order> queryOrdersByKeyword(int guideId, String keyword, int lastIndex) {
        if (lastIndex == NumberUtil.ALL_INDEX)
            return orderRepository.findByGuideIdAndKeyword(guideId, keyword, Integer.MAX_VALUE);

        int limit = lastIndex + NumberUtil.SEARCH;

        List<Order> orders = orderRepository.findByGuideIdAndKeyword(guideId, keyword, limit);

        int size = orders.size();

        if (size >= limit)
            return orders.subList(lastIndex, limit);

        return orders.subList(lastIndex, size);
    }
}
