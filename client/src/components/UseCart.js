import { useQuery } from '@apollo/client';
import { USER_CART } from '../utils/queries';

const useCart = (userId) => {
    const { loading, error, data } = useQuery(USER_CART, {
        variables: {
            userId: userId,
        },
    });

    return {
        loading,
        error,
        userCart: data ? data.userCart : null,
    };
};

export default useCart;