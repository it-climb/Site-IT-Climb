'use strict';
import _ from "lodash";
import moment from 'moment';
import {browserHistory} from 'react-router';

const QUANTITY = 5,
    MIDDLE = parseInt(QUANTITY / 2),
    DOWN = 'DOWN',
    UP = 'UP',
    NOT_MODIFIED = 'NOT_MODIFIED';


let blogPaginationUtils = {

    generateBlogPagination: () => {
        let currentDate = new Date(),
            currentYear = currentDate.getFullYear(),
            currentMonth = currentDate.getMonth(),
            blogPagination = [];

        for(let i=0; i<QUANTITY; i++){
            if (i==0) {
            }
            else if (currentMonth == 0) {
                currentMonth = 11;
                currentYear--;
            }
            else {
                currentMonth--;
            }
            blogPagination.push(new PaginationMouth(new Date(currentYear, currentMonth, 1)));
        }
        return blogPagination;
    },

    updateBlogPagination: (paginationArray, date)=>{
        let center,
            way,
            currentDate = new Date(),
            currentYear = currentDate.getFullYear(),
            currentMonth = currentDate.getMonth(),
            maxDateArrange = new Date(currentYear, currentMonth, 1);

        for (let i = 0; i < QUANTITY; i++) {
            if (paginationArray[i].date === date) {
                center = i;
                if (i > MIDDLE) {
                    way = DOWN;
                }
                else if ((i < MIDDLE) && (paginationArray[0].date < maxDateArrange)) {
                    way = UP;
                }
                else {
                    way = NOT_MODIFIED;
                }
                break;
            }
        }


        if(way === NOT_MODIFIED){
            return  paginationArray;
        }

        let offset = way===DOWN ? center-MIDDLE : MIDDLE-center,
            lastDate = paginationArray[way===DOWN ? paginationArray.length - 1: 0].date;

        currentYear = lastDate.getFullYear();
        currentMonth = lastDate.getMonth();


        for(let i=0; i<offset; i++){

            if(way===DOWN){
                if(currentMonth === 0){
                    currentYear--;
                    currentMonth = 11;
                }else{
                    currentMonth--;
                }
            }else{
                if(currentMonth === 11){
                    currentYear++;
                    currentMonth = 0;
                }else{
                    currentMonth++;
                }
            }

            let newDate = new Date(currentYear, currentMonth, 1);

            if(newDate>maxDateArrange){
                break;
            }

            let newPaginationMouth = new PaginationMouth(newDate);

            if(way===DOWN){
                paginationArray.shift();
                paginationArray.push(newPaginationMouth);
            }else{
                paginationArray.pop();
                paginationArray.unshift(newPaginationMouth);
            }

        }
        return paginationArray;
    },

    goToBlog(id, ev){
        ev && ev.preventDefault();
        browserHistory.push(`/blog/${id}`);
    }

};

export default blogPaginationUtils;

class PaginationMouth{

    constructor(date){
        this.date = date;
        this.formattedDate = moment(date).format('MMMM YYYY');
        this.key = date.toString();
    }

}