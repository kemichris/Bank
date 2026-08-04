import Counter from '../models/counter.model.js';

export const generateAccountNumber = async (session) => {
    let counter = await Counter.findOne(
        { name: 'accountNumber' },
        null,
        { session }
    );

    // Create the counter if it doesn't exist
    if (!counter) {
        counter = new Counter({
            name: 'accountNumber',
            value: 3500000000
        });
    }

    // Increment by one
    counter.value += 1;

    // Save within the current transaction
    await counter.save({ session });

    return String(counter.value);
};