const dropdown = {
    initial: {
        opacity: 0,
        height: 0,
    },
    animate: {
        opacity: 1,
        height: 'auto',
        transition: {
            duration: .3
        }
    }
}

const dropdownItem = {
    whileHover: {
        backgroundColor: '#122440',
        color: '#fff',
        transition: {
            duration: .2
        }
    }
}

export { dropdown, dropdownItem }