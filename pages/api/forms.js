export default function handler(req, res) {
    const { type } = req.query

    const data = {
        drivers: {
            name: "Ravi Kumar",
            city: "Hyderabad",
            contact: "9876543210",
            companyCode: "THKN",
            password: "Ada@2343",
            confirmPassword: "Ada@2343",
            branchCode: "THBKK",
            licenceNumber: "AP29DL1234",
            driverType: "Local Driver",
            age: "34",
            drivingSince: "2012",
        },
        vehicles: {
            RegisterNumber: "AP31BR0012",
            length: "12 (m)",
            width: "2.5 ( inches)",
            height: "3 (cm)",
            weight: "8000 kg",
            volume: "25 (cbm)",
            contactName: "Kiran Rao",
            contactNumber: "9988776655",
            vehicleType: "22wheeler",
            insuredBy: "HDFC Ergo",
            insuranceStart: "2024-01-01",
            insuranceEnd: "2025-01-01",
            truckBrand: "Ashok Leyland",
            fuelType: "Diesel",
            trailerNo: "TRL-2025",
            status: "Active",
            description: "Heavy-duty truck",
            vehicleOwner: "Company Owned",
            emissionClass: "Euro 6",
            currentLocation: "Hyderabad",
        },
        ordertypes: {
            orderType: "",
            description: "",
            departmentCode: "",
        },
        costcenters: {
            costCenter: "",
            description: "",
            customerName: "",
            companyCode: "THKN",
            branchCode: "THBKK",
            departmentCode: "",
        },
    }

    if (data[type]) {
        res.status(200).json(data[type])
    } else {
        res.status(404).json({ error: "Form type not found" })
    }
}
