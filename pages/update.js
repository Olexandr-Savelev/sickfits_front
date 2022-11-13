import { useRouter } from 'next/router';
import UpdateProduct from '../components/UpdateProduct';

const SellPage = () => {
  const router = useRouter();
  return <UpdateProduct id={router.query.id} />;
};

export default SellPage;
