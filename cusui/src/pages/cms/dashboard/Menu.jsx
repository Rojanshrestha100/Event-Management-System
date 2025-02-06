import React, { useEffect, useState } from "react";
import http from "../../../http"; // Assuming http is correctly configured for API requests

const List = ({onSelectionChange}) => {
    const [menus, setMenus] = useState([]);
    const [selectedMenuItems, setSelectedMenuItems] = useState([]);


    // Function to handle checkbox change
    const handleMenuChange = (ev) => {
        const checked = ev.target.checked;
        const val = ev.target.id.split('-')[1];

        if (checked) {
            // Add to the array
            setSelectedMenuItems(prevItems => [...prevItems, val]);
            console.log(`Menu item ${val} selected.`);
            onSelectionChange(selectedMenuItems);
        } else {
            // Remove from the array
            setSelectedMenuItems(prevItems => prevItems.filter(item => item !== val));
            console.log(`Menu item ${val} unselected.`);
            onSelectionChange(selectedMenuItems);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        http.get('/cuscms/menus')
            .then(({ data }) => setMenus(data))
            .catch(err => console.error("Failed to load menus:", err));
    };

    // Function to group menus by category
    const groupMenusByCategory = (menus) => {
        const grouped = {};
        menus.forEach(menu => {
            const categoryName = menu.category[0]?.categoryname || "Uncategorized";
            if (!grouped[categoryName]) {
                grouped[categoryName] = [];
            }
            grouped[categoryName].push(menu);
        });
        return grouped;
    };

    const groupedMenus = groupMenusByCategory(menus);

    const categoryNames = Object.keys(groupedMenus);
    const firstTwoCategories = categoryNames.slice(0, 2);
    const remainingCategories = categoryNames.slice(2);

    return (
        <div className="row">
            <div className="col-12 my-3 bg-white py-3">
                <div className="row">
                    <div className="col">
                        <h1>Menus</h1>
                    </div>
                </div>
                <div className="row">
                    {menus.length ? (
                        <>
                            <div className="col-md-6">
                                {firstTwoCategories.map(categoryName => (
                                    <div key={categoryName} className="mb-4">
                                        <h3 className="text-primary">{categoryName}</h3>
                                        <div className="list-group">
                                            {groupedMenus[categoryName].map(menu => (
                                                <div key={menu.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {menu.menuitems}
                                                    <input type="checkbox" id={`menu-${menu._id}`} onChange={handleMenuChange} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-6">
                                {remainingCategories.map(categoryName => (
                                    <div key={categoryName} className="mb-4">
                                        <h3 className="text-primary">{categoryName}</h3>
                                        <div className="list-group">
                                            {groupedMenus[categoryName].map(menu => (
                                                 <div key={menu.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                 {menu.menuitems}
                                                 <input type="checkbox" id={`menu-${menu._id}`} onChange={handleMenuChange} />
                                             </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <h4 className="text-muted fst-italic">No data added.</h4>
                    )}
                </div>
            </div>
        </div>
    );
};

export default List;
