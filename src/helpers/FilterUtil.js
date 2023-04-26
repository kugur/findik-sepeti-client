export const createFilterParam = function(filterItem, otherFilters = []) {
    if (filterItem && filterItem.name && filterItem.operation ) {
        return [...otherFilters,
            {
                name: filterItem.name,
                operation: filterItem.operation,
                value: filterItem.value,
            }];
    } else {
        return otherFilters;
    }
}

export const createSortParam = function(value = {value: "DESC,Id"}) {
    return value.value;
}