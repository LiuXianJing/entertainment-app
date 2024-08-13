
export const transformNumber = (number: number): string => {
    const unitNumber: number = 1000
    if(number > unitNumber) {
        const thoundsNumber = Math.floor(number / unitNumber)
        if(number > (thoundsNumber * unitNumber)) {
            return thoundsNumber + "K+"
        } else {
            return thoundsNumber + "K"
        }
    } else {
        return String(number)
    }
}