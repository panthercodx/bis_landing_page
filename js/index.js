// regx 
const emailPattern = /^[\w-\.]+@(myshopify.com)$/

// Email Input validation START

// function onSubmit() {
//     let emailEvent = document.getElementById('email')

//     // value 
//     let email = emailEvent.value

//     // regx 
//     const emailPattern = /^[\w-\.]+@(myshopify.com)$/
//     if (email.match(emailPattern)) {
//         console.log('form submit')
//     } else {
//         emailEvent.classList.add('errors')
//     }
// }

// function removeErr() {
//     let emailEvent = document.getElementById('email')
//     emailEvent.classList.remove('errors')
// }
// Email Input validation END

function getIcons(icon) {
    switch (icon) {
        case "01_notifications":
            return "bi-bell-fill"
            break;
        case "02_impressions_of_products":
            return "bi-box-fill"
            break;
        case "03_Unlimited_back_in_stock_requests":
            return "bi-info-circle-fill"
            break;
        case "04_automatic_back_in_stock_reminders":
            return "bi-hourglass-split"
            break;
        case "05_fully_customizable":
            return "bi-grid-1x2-fill"
            break;
        case "06_send_notification_to_individual_customer":
            return "bi-person-fill-exclamation"
            break;
        case "07_online_support":
            return "bi-person-fill-gear"
            break;
        case "08_basic_reports":
            return "bi-file-earmark-text-fill"
            break;
        default:
            return "bi-database-fill-check"
    }
}

function getPlanFeatures(val) {
    let html = '';
    let count = 0
    Object.entries(val).forEach(([key, plans]) => {

        html += `<li class="mb-2 d-flex flex-row">
            <div class="pe-3">
                <i class="bi ${getIcons(key)}"></i>
            </div>
            <div class="text">${plans.label}</div>
        </li>`
    })
    return html
}


function render(data) {
    let plans = document.getElementById('plans')
    let html = '';
    data.forEach(item => {
        html += `<div class="col-12 col-md-6 col-lg-4 mb-3 mb-md-4 mb-lg-0 " >
                <div class="custom-card h-100" >
                    <div class="d-flex flex-column justify-content-center align-items-center border-bottom pb-3">
                        <div class="my-3">
                            <span class="plan-label free">${item.name}</span>
                        </div>
                        <h2><sup>$</sup>${item.price}</h2>
                    </div>
                    <div class="d-flex flex-column justify-content-between">
                        <ul class="plan-list py-4" >
                            ${getPlanFeatures(item.plan_features)}
                        </ul>
                        <div class="d-flex justify-content-center">
                                <a href="https://apps.shopify.com/notifyme" style="text-decoration:none;" class="plan-btn secondary-btn">Select</a>
                        </div>
                    </div>
                </div>
            </div>`
    })
    document.getElementById('plans').innerHTML = html
}

async function getPlans() {
    const res = await fetch('https://bis.syncresource.app/api/get-all-plans')
    if (res.status === 200) {
        const data = await res.json()
        render(data?.data)
    } else {
        window.alert("Fail to fetch Api")
    }
}

getPlans()