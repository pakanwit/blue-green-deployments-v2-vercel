import Image from 'next/image';
import { IReviewsResponse } from '../../model/Schema';
import Link from 'next/link';

interface TrustBoxProps extends IReviewsResponse {
  notClickable?: boolean;
}

const TrustBox = ({
  customerName,
  ratingUrl,
  customerPicture,
  customerPictureSize,
  reviewText,
  reviewTitle,
  reviewUrl,
  notClickable,
}: TrustBoxProps) => {
  const content = (
    <div className="bg-card-box shadow-on-hover py-5 px-4 rounded-lg relative flex flex-col w-full gap-5 cursor-pointer">
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <h6 className="mb-0">{customerName}</h6>
          <Image src={ratingUrl} width={64} height={24} alt="rating" />
        </div>
        <div className="">
          {customerPicture ? (
            <Image
              className="rounded-full"
              src={customerPicture}
              width={customerPictureSize?.width || 40}
              height={customerPictureSize?.height || 40}
              alt="customer"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#b1f2d0] text-center items-center flex justify-center">
              {customerName.slice(0, 2).toLocaleUpperCase()}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="underline text-lg text-start">{reviewTitle}</div>
        <span className="text-sm text-ellipsis overflow-hidden no-underline">
          {reviewText}
        </span>
      </div>
    </div>
  );

  return notClickable ? (
    <div className="pointer-events-none">{content}</div>
  ) : (
    <Link href={reviewUrl} target="_blank" className="no-underline">
      {content}
    </Link>
  );
};

export default TrustBox;
