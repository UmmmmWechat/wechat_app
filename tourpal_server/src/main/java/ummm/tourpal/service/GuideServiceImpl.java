package ummm.tourpal.service;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Override
    public boolean queryIfNew(String code) {
        return guideRepository.existsByOpenId(APIUtil.getOpenId(code));
    }

    @Override
    public int signUp(GuidePre guidePre) {
        Guide guide = new Guide();

        //TODO (真实身份验证)

        guide.setOpenId(guidePre.openId);
        guide.setRealName(guidePre.realName);
        guide.setIdCard(guidePre.idCard);
        guide.setGender(guidePre.gender);
        guide.setWechat(guidePre.wechat);
        guide.setPhone(guidePre.phone);
        guide.setIntroduction(guidePre.introduction);
        guide.setFavorSpots(guidePre.favorSpots);

        return guideRepository.saveAndFlush(guide).getId();
    }

    public Guide login(String code) {
        return guideRepository.findByOpenId(APIUtil.getOpenId(code));
    }

    @Override
    public ResultMessage modifyGuideInfo(GuideModify guideModify) {
        Guide guide = guideRepository.getOne(guideModify.id);

        guide.setWechat(guideModify.wechat);
        guide.setPhone(guideModify.phone);
        guide.setIntroduction(guideModify.introduction);
        guide.setFavorSpots(guideModify.favorSpots);

        guideRepository.saveAndFlush(guide);

        return ResultMessage.OK;
    }

    @Override
    public ResultMessage acceptOrder(int orderId) {
        return handleOrder(orderId, true);
    }

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

    @Override
    public List<Order> queryOrders(int guideId, State state, int lastIndex) {
        List<Order> orders = (state == State.ALL) ? orderRepository.findByGuideId(guideId) : orderRepository.findByGuideIdAndState(guideId, state);

        if (lastIndex == NumberUtil.ALL_INDEX)
            return orders;

        int size = orders.size();

        return orders.subList(lastIndex, lastIndex + NumberUtil.PAGE <= size ? lastIndex + NumberUtil.PAGE : size);
    }


    @Override
    public List<Order> queryOrdersByKeyword(int guideId, String keyword, int lastIndex) {
        List<Order> orders = orderRepository.findByGuideIdAndKeyword(guideId, keyword);

        if (lastIndex == NumberUtil.ALL_INDEX)
            return orders;

        int size = orders.size();

        return orders.subList(lastIndex, lastIndex + NumberUtil.PAGE <= size ? lastIndex + NumberUtil.PAGE : size);
    }
}
