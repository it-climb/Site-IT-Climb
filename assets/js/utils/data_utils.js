'use strict';
import _              from 'lodash';
import moment         from 'moment';


let dataUtils = {

    /**
     * Get elements array from store
     * @param store
     * @returns {Array} - array of elements from store
     */
    getItemsArrayFromStore:(store)=>{
        return Object.keys(store).map((key)=>{
            return store[key];
        });
    },

    /**
     * join array item to main array into field if comparable fields equals
     * @param array - main array
     * @param comparableFieldName - comparable field
     * @param joinedArray - array for join
     * @param joinedComparableFieldName - comparable field of array for join
     * @param newFieldName - field name which will contain joined array item
     * @returns {*} - main array with new field
     */
    mergeData:(array, comparableFieldName, joinedArray, joinedComparableFieldName, newFieldName)=>{
        for(let i=0; i<array.length; i++){
            for(let j=0; j<joinedArray.length; j++){
                if(_.isUndefined(array[i][newFieldName]) && array[i][comparableFieldName]==joinedArray[j][joinedComparableFieldName]){
                    array[i][newFieldName] = joinedArray[j];
                }
            }
        }
        return array;
    },

    isLast(index, array){
        return (index==array.length-1) && ((array.length & 1)!==0);
    },

    groupSchedulesByRoute(schedules){
        let routeWrappers = [];
        for(let schedule of schedules){
            if(_.isEmpty(schedule.route)){
                continue;
            }
            let findRoute = false;
            for(let routeWrapper of routeWrappers){
                if(routeWrapper.route.id==schedule.route.id){
                    routeWrapper.schedules.push(schedule);
                    findRoute = true;
                    break;
                }
            }
            if(!findRoute){
                let schedulesArray = [];
                schedulesArray.push(schedule);
                let routeWrapper = {
                    route: schedule.route,
                    schedules: schedulesArray
                };
                routeWrappers.push(routeWrapper);
            }
        }
        return routeWrappers;
    },

    getTodayOpenHours(hoursData){

        let {week_ranges} = hoursData;
        let openHours = [];
        for(let day of week_ranges){
            let thisDay = moment().format('dddd');
            if(day.day_name === thisDay){
                if(Array.isArray(day.times)){
                    for(let time of day.times){
                        openHours.push(` ${time.open_time} - ${time.close_time} `);
                    }
                }
                return openHours;
            }
        }
        return [];
    }

};

export default dataUtils;