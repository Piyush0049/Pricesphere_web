import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICoupon extends Document {
    _id: Types.ObjectId;
    name: string;
    highlight: string;
    details: string;
    code: string;
    expired: 'expired' | 'soon' | 'not'; // Restricted to these three values
    website: string;
    createdAt: Date;
    updatedAt: Date;
}

const CouponSchema: Schema = new Schema<ICoupon>({
    name: {
        type: String,
        required: true,
        maxlength: 255, // Adjust the maximum length as needed
    },
    highlight: {
        type: String,
        required: true,
        maxlength: 500, // Adjust the maximum length as needed
    },
    details: {
        type: String,
        required: true,
        maxlength: 2000, // Adjust the maximum length as needed
    },
    code: {
        type: String,
        required: true,
        maxlength: 50, // Adjust the maximum length as needed
    },
    expired: {
        type: String,
        enum: ['expired', 'soon', 'not'], // Enforcing the allowed values
        required: true,
    },
    website: {
        type: String,
        required: true,
        maxlength: 50,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

CouponSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Coupon =  mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
export default Coupon;
