import { PaymentElement } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Payments = () => {
  const user = useSelector((state) => state.users.user)
  const tutor = useSelector((state) => state.tutors.tutor)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/stripe/create-checkout-session`,
        {
          amount: 1000,
          cartItems: [
            // Array of items to test
            { id: 1, name: 'Item 1', price: 10 },
            { id: 2, name: 'Item 2', price: 20 },
          ],
        }
      )
      console.log(data)
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <button onClick={handleSubmit}>Checkout</button>
    </>
  )
}

export default Payments
