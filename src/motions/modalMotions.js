const modalBG = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: .5,
            delayChildren: 1
        }
    },
    exit: {
        opacity: 0
    }
}

const modal = {
    desktop: {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 250,
                duration: .3
            }
        },
        exit: {
            scale: 0,
            transition: {
                duration: .1
            }
        }
    },
    mobile: {
        initial: {
            bottom: '-100%'
        },
        animate: {
            bottom: 0,
            transition: {
                duration: .3,
                type: "linear",
                stiffness: 500
            }
        },
        exit: {
            bottom: '-100%',
            transition: {
                duration: .1,
                type: "linear",
                stiffness: 500
            }
        }
    }
}

const updateModal = {
    initial: {
        opacity: 0,
        y: '25%'
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: .3
        }
    },
    exit: {
        y: '25%',
        opacity: 0,
        transition: {
            duration: .3
        }
    }
}

export {
    modalBG,
    updateModal,
    modal
}