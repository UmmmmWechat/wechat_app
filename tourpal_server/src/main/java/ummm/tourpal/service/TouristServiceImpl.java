package ummm.tourpal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import ummm.tourpal.dao.GuideRepository;
import ummm.tourpal.dao.OrderRepository;
import ummm.tourpal.dao.SpotRepository;
import ummm.tourpal.dao.TouristRepository;
import ummm.tourpal.entity.*;
import ummm.tourpal.util.APIUtil;
import ummm.tourpal.util.NumberUtil;

import java.util.Date;
import java.util.List;

@Service
public class TouristServiceImpl implements TouristService {
    @Autowired
    private TouristRepository touristRepository;

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SpotRepository spotRepository;

    @Override
    public int login(String code) {
        String openId = APIUtil.getOpenId(code);

        Tourist tourist = touristRepository.findByOpenId(openId);

        if (tourist == null) {
            //TODO (完善tourist)
            touristRepository.saveAndFlush(tourist);
        }

        return tourist.getId();
    }

    @Override
    public Tourist queryById(int id) {
        return touristRepository.getOne(id);
    }

    @Override
    public List<Guide> queryGuideBySpot(int spotId, int lastIndex) {
        if (lastIndex == NumberUtil.ALL_INDEX)
            return guideRepository.findByFavorSpots(spotId, Integer.MAX_VALUE);

        int limit = lastIndex + NumberUtil.PAGE;

        List<Guide> guides = guideRepository.findByFavorSpots(spotId, limit);

        int size = guides.size();

        if (size >= limit)
            return guides.subList(lastIndex, limit);

        return guides.subList(lastIndex, size);
    }

    @Cacheable(value = "guide", key = "#guide.id")
    @Override
    public List<Guide> queryGuideByKeyword(String keyword, int lastIndex) {
        if (lastIndex == NumberUtil.ALL_INDEX)
            return guideRepository.findByKeyword(keyword, Integer.MAX_VALUE);

        int limit = lastIndex + NumberUtil.PAGE;

        List<Guide> guides = guideRepository.findByKeyword(keyword, limit);

        int size = guides.size();

        if (size >= limit)
            return guides.subList(lastIndex, limit);

        return guides.subList(lastIndex, size);
    }

    @CachePut(value = "order", key = "#order.id")
    @Override
    public int inviteGuide(OrderPre orderPre) {
        Order order = new Order();

        order.setTouristId(orderPre.touristId);
        order.setSpotId(orderPre.spotId);
        order.setGuideId(orderPre.guideId);
        order.setGeneratedDate(orderPre.generatedDate);
        order.setTravelDate(orderPre.travelDate);
        order.setMessage(orderPre.message);
        order.setState(State.WAITING);

        return orderRepository.saveAndFlush(order).getId();
    }

    @Cacheable(value = "order", key = "#order.id")
    @Override
    public List<Order> queryOrders(int touristId, State state, int lastIndex) {
//        if (state == State.ALL) {
//            if (lastIndex == NumberUtil.ALL_INDEX)
//                return orderRepository.findByTouristId(touristId, Integer.MAX_VALUE);
//            else {
//                int limit = lastIndex + NumberUtil.PAGE;
//
//                List<Order> orders = orderRepository.findByTouristId(touristId, limit);
//
//                int size = orders.size();
//
//                if (size >= limit)
//                    return orders.subList(lastIndex, limit);
//
//                return orders.subList(lastIndex, size);
//            }
//        }
//
//        if (lastIndex == NumberUtil.ALL_INDEX)
//            return orderRepository.findByTouristIdAndState(touristId, state, Integer.MAX_VALUE);
//
//        int limit = lastIndex + NumberUtil.PAGE;
//
//        List<Order> orders = orderRepository.findByTouristIdAndState(touristId, state, limit);
//
//        int size = orders.size();
//
//        if (size >= limit)
//            return orders.subList(lastIndex, limit);
//
//        return orders.subList(lastIndex, size);
        return null;
    }

    @Override
    public List<Order> queryOrdersByKeyword(int touristId, String keyword, int lastIndex) {
//        if (lastIndex == NumberUtil.ALL_INDEX)
//            return orderRepository.findByTouristIdAndKeyword(touristId, keyword, Integer.MAX_VALUE);
//
//        int limit = lastIndex + NumberUtil.PAGE;
//
//        List<Order> orders = orderRepository.findByTouristIdAndKeyword(touristId, keyword, limit);
//
//        int size = orders.size();
//
//        if (size >= limit)
//            return orders.subList(lastIndex, limit);
//
//        return orders.subList(lastIndex, size);
        return null;
    }


    @Cacheable(value = "order", key = "#order.id")
    @CachePut(value = "order", key = "#order.id")
    @Override
    public ResultMessage cancelOrder(int orderId, String cancelMessage) {
        Order order = orderRepository.getOne(orderId);

        State state = order.getState();

        if (state == State.ONGOING)
            return ResultMessage.ALREADY_ACCEPTED;
        else if (state == State.REJECTED)
            return ResultMessage.ALREADY_REJECTED;
        else if (order.getTravelDate().before(new Date())) {
            order.setState(State.ONGOING);
            return ResultMessage.ALREADY_TIMEOUT;
        }

        order.setState(State.CANCELED);

        orderRepository.saveAndFlush(order);

        return ResultMessage.OK;
    }


    @Cacheable(value = "order", key = "#order.id")
    @CachePut(value = "order", key = "#order.id")
    @Override
    public ResultMessage commendOrder(int orderId, Feedback feedback) {
        Order order = orderRepository.getOne(orderId);

        order.setFeedback(feedback);
        order.setState(State.FINISHED);


        Guide guide = guideRepository.getOne(order.getGuideId());
        int numOfFinishOrder = guide.getNumOfFinishOrder();
        int goodFeedbackRate = guide.getGoodFeedbackRate();

        guide.setGoodFeedbackRate(Math.round((numOfFinishOrder++ * goodFeedbackRate + feedback.getGuidePoint() * NumberUtil.GUIDE_RATE) / numOfFinishOrder));
        guide.setNumOfFinishOrder(numOfFinishOrder);


        Spot spot = spotRepository.getOne(order.getSpotId());
        int popularity = spot.getPopularity();
        int recommendLevel = spot.getRecommendLevel();

        spot.setRecommendLevel(Math.round((popularity++ * recommendLevel + feedback.getSpotPoint() * NumberUtil.SPOT_RATE) / popularity));
        spot.setPopularity(popularity);


        orderRepository.saveAndFlush(order);
        guideRepository.saveAndFlush(guide);
        spotRepository.saveAndFlush(spot);

        return ResultMessage.OK;
    }
}
