import { IReviewsResponse } from '../../../model/Schema';
import { withApiKeyValidation } from '../utils/withApiKeyValidation';
interface TrustpilotReviewsResponse {
  links: {
    href: string;
    method: string;
    rel: string;
  }[];
  reviews: {
    links: {
      href: string;
      method: string;
      rel: string;
    }[];
    id: string;
    consumer: {
      links: {
        href: string;
        method: string;
        rel: string;
      }[];
      id: string;
      displayName: string;
      displayLocation: null | string;
      numberOfReviews: number;
    };
    businessUnit: {
      links: {
        href: string;
        method: string;
        rel: string;
      }[];
      id: string;
      identifyingName: string;
      displayName: string;
    };
    location: null | string;
    stars: number;
    title: string;
    text: string;
    language: string;
    createdAt: string;
    experiencedAt: string;
    updatedAt: null | string;
    companyReply: null | string;
    isVerified: boolean;
    source: string;
    numberOfLikes: number;
    status: string;
    reportData: null | unknown;
    complianceLabels: string[];
    countsTowardsTrustScore: boolean;
    countsTowardsLocationTrustScore: null | boolean;
    invitation: null | unknown;
    businessUnitHistory: unknown[];
    reviewVerificationLevel: string;
  }[];
}

async function getReviews(req, res) {
  try {
    // const trustpilotReviewsResponse = await fetch(
    //   `https://api.trustpilot.com/v1/business-units/${process.env.TRUSTPILOT_BUSINESS_UNIT_ID}/reviews?apikey=${process.env.TRUSTPILOT_API_KEY}&perPage=50`,
    // );

    // const trustpilotReviews: TrustpilotReviewsResponse =
    //   await trustpilotReviewsResponse.json();

    // const starsUrls = [
    //   {
    //     stars: 1,
    //     url: 'https://images-static.trustpilot.com/api/stars/1/star.svg',
    //   },
    //   {
    //     stars: 2,
    //     url: 'https://images-static.trustpilot.com/api/stars/2/star.svg',
    //   },
    //   {
    //     stars: 3,
    //     url: 'https://images-static.trustpilot.com/api/stars/3/star.svg',
    //   },
    //   {
    //     stars: 4,
    //     url: 'https://images-static.trustpilot.com/api/stars/4/star.svg',
    //   },
    //   {
    //     stars: 5,
    //     url: 'https://images-static.trustpilot.com/api/stars/5/star.svg',
    //   },
    // ];

    // const reviews: IReviewsResponse[] = trustpilotReviews.reviews.map(
    //   (review) => {
    //     const profileUrl = review.consumer.links.find(
    //       (link) => link.rel === 'profile-image',
    //     );
    //     const consumerName = review.consumer.displayName.split(' ');
    //     const firstName = consumerName[0];
    //     const lastName = consumerName[1]
    //       ? consumerName[1].charAt(0).toUpperCase() + '.'
    //       : '';
    //     return {
    //       customerName: `${firstName} ${lastName}`,
    //       customerPicture: profileUrl?.href,
    //       ratingUrl: starsUrls.find((star) => star.stars === review.stars)?.url,
    //       reviewText: review.text,
    //       reviewUrl: `https://www.trustpilot.com/reviews/${review.id}`,
    //       reviewTitle: review.title,
    //       stars: review.stars,
    //       id: review.id,
    //     };
    //   },
    // );

    // const selectedReviewIds = [
    //   '66677857ac302cbb451ace70',
    //   '665d98a27fe3a48511cd9431',
    // ];

    // const sortedReviews = reviews.sort((a, b) => b.stars - a.stars);
    // const firstThreeReviews = sortedReviews.filter((review) =>
    //   selectedReviewIds.includes(review.id),
    // );

    const hardcodedReview1: IReviewsResponse = {
      customerName: 'Sandra Z.',
      customerPicture: '/img/TrustPic4.png',
      customerPictureSize: { width: 40, height: 40 },
      ratingUrl: 'https://images-static.trustpilot.com/api/stars/5/star.svg',
      reviewText: "Very easy to use and with a professional outcome! saved me so much money.",
      reviewUrl: 'https://www.trustpilot.com/reviews/66677857ac302cbb451ace70',
      reviewTitle: "Money Saver",
      stars: 5,
      id: '66677857ac302cbb451ace70',
    };

    const hardcodedReview2: IReviewsResponse = {
      customerName: 'Individual Choice Support',
      customerPicture: '/img/TrustPic5.png',
      customerPictureSize: { width: 40, height: 40 },
      ratingUrl: 'https://images-static.trustpilot.com/api/stars/5/star.svg',
      reviewText: "Easy to use system. Final plan is a good reflection of our business and is very specific to our sector..",
      reviewUrl: 'https://www.trustpilot.com/reviews/667ef1482545991ff624dc2d',
      reviewTitle: "Excellent Final Result",
      stars: 5,
      id: '667ef1482545991ff624dc2d',
    };

    const allReviews = [hardcodedReview1, hardcodedReview2];

    res.status(200).json(allReviews);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request.' });
  }
}
export default async function handler(request, response) {
  const getReviewsHandler = withApiKeyValidation(getReviews);

  await getReviewsHandler(request, response);
}
