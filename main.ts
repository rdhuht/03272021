input.onButtonPressed(Button.A, function () {
    basic.showNumber(1)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(0)
})
function adjustTM () {
    timeanddate.numericTime(function (hour, minute, second, month, day, year) {
        if (input.buttonIsPressed(Button.A)) {
            if (hour >= 24) {
                timeanddate.set24HourTime(0, minute, 0)
            }
            timeanddate.set24HourTime(hour + 1, minute, 0)
            tm.showNumber(hour * (100 + minute))
            basic.pause(200)
        }
        if (input.buttonIsPressed(Button.B)) {
            if (minute >= 60) {
                timeanddate.set24HourTime(hour, 0, 0)
            }
            timeanddate.set24HourTime(hour, minute + 1, 0)
            tm.showNumber(hour * (100 + minute))
            basic.pause(200)
        }
    })
}
let tm: TM1637.TM1637LEDs = null
tm = TM1637.create(
DigitalPin.P1,
DigitalPin.P2,
7,
4
)
timeanddate.set24HourTime(12, 0, 0)
adjustTM()
basic.forever(function () {
    tm.showDP(1, true)
    basic.pause(500)
    tm.showDP(1, false)
    basic.pause(500)
    timeanddate.numericTime(function (hour, minute, second, month, day, year) {
        tm.showNumber(hour * 100 + minute)
    })
})
/**
 * 判断何时做何事
 * 
 * 6:30起床
 * 
 * 7:00早餐
 * 
 * 8:00户外运动
 * 
 * 12:00午餐
 * 
 * 18:00晚餐
 * 
 * 21:00睡觉
 * 
 * 舵机指针指向某个角度
 * 
 * 15
 * 
 * 45
 * 
 * 75
 * 
 * 105
 * 
 * 135
 * 
 * 165
 */
basic.forever(function () {
    timeanddate.numericTime(function (hour, minute, second, month, day, year) {
        if (hour == 6 && minute == 30) {
            pins.servoWritePin(AnalogPin.P16, 15)
        } else if (hour == 7 && minute == 0) {
            pins.servoWritePin(AnalogPin.P16, 45)
        } else if (hour == 8 && minute == 0) {
            pins.servoWritePin(AnalogPin.P16, 75)
        } else if (hour == 12 && minute == 0) {
            pins.servoWritePin(AnalogPin.P16, 105)
        } else if (hour == 18 && minute == 0) {
            pins.servoWritePin(AnalogPin.P16, 135)
        } else if (hour == 21 && minute == 0) {
            pins.servoWritePin(AnalogPin.P16, 165)
        }
    })
})
