import { IReviewsResponse } from "../../../../model/Schema";
import { withApiKeyValidation } from "../utils/withApiKeyValidation";
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
    // Get review from Trustpilot API
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
    //   '6678bd3ef3b49c04537c57fe', //BraYah
    //   '665bce79b08caaf1bf7fa150', // carl
    // ];
    // const sortedReviews = reviews.sort((a, b) => b.stars - a.stars);
    // const firstTwoReviews = sortedReviews.filter((review) =>
    //   selectedReviewIds.includes(review.id),
    // );

    const hardcodedReview1: IReviewsResponse = {
      customerName: "Harry M.",
      customerPicture: "/img/TrustPic1.png",
      customerPictureSize: { width: 40, height: 40 },
      ratingUrl: "https://images-static.trustpilot.com/api/stars/5/star.svg",
      reviewText:
        "I needed a business plan to apply for a bank loan, and 15MinutePlan made it so simple. The plan was SBA-approved, and the bank was impressed with its thoroughness. Fantastic service!",
      reviewUrl: "https://www.trustpilot.com/reviews/6655fee17f99032e1ef78967",
      reviewTitle: "I needed a business plan to apply for a…",
      stars: 5,
      id: "6655fee17f99032e1ef78967",
    };

    const hardcodedReview2: IReviewsResponse = {
      customerName: "BraYah L.",
      customerPicture: "/img/TrustPic2.png",
      customerPictureSize: { width: 40, height: 40 },
      ratingUrl: "https://images-static.trustpilot.com/api/stars/5/star.svg",
      reviewText:
        "I had to make an urgent business plan for my new company. I had already made one in past and it was a lot of work spending several days and nights. A friend recommended 15minuteplan.ai and to be honest within a few hours I had the perfect plan, fully detailed etc. I will certainly recommend it to others. Thanks a lot guys. Much appreciated.",
      reviewUrl: "https://www.trustpilot.com/reviews/6678bd3ef3b49c04537c57fe",
      reviewTitle: "A plan in need is 15minute.ai indeed",
      stars: 5,
      id: "6678bd3ef3b49c04537c57fe",
    };

    const hardcodedReview3: IReviewsResponse = {
      customerName: "Nicole I.",
      customerPicture: "/img/TrustPic3.png",
      customerPictureSize: { width: 40, height: 40 },
      ratingUrl: "https://images-static.trustpilot.com/api/stars/5/star.svg",
      reviewText:
        "Simple and easy to use, took so little time, and feels like the tool knows exactly what I want to include and review and consider, and then generates a product on a much higher level than i would have been able to do it on my own without having a professional assist me, taking factors into consideration that I would not have considered.",
      reviewUrl: "https://www.trustpilot.com/reviews/668cfb74bb6a1188ae24d057",
      reviewTitle: "Simple and easy to use, comprehensive and mind-reading!",
      stars: 5,
      id: "668cfb74bb6a1188ae24d057",
    };

    const allReviews = [hardcodedReview1, hardcodedReview2, hardcodedReview3];

    res.status(200).json(allReviews);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
}
export default async function handler(request, response) {
  const getReviewsHandler = withApiKeyValidation(getReviews);

  await getReviewsHandler(request, response);
}
