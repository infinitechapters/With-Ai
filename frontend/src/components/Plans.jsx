import React from 'react'
import {PricingTable} from '@clerk/clerk-react'

const Plans = () => {
    return (
        <div className="max-w-2xl mx-auto z-20 my-30">
            <div className="text-center">
                <h2 className="text-slate-700 text-4xl pb-2 font-semibold">Choose your Plan</h2>
                <p className="text-xl max-w-lg mx-auto text-slate-500">Start for free and scale up as you grow.Find the perfect plan as your creation needs.</p>
            </div>
            <div className="mt-14 max-sm:mx-8">
                <PricingTable/>
            </div>
        </div>
    )
}

export default Plans