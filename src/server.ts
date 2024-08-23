import app from './app';

app.listen(process.env.SERVER_PORT || 5252, () => {
    console.log(`Server runs at ${process.env.SERVER}:${process.env.SERVER_PORT || 5252}`)
});