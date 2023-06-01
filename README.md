###################### Authentification ################################
router.post("/register", registerUser)  the user can create an account (normal user or entreprise)
router.post("/login", login)  (the user can log in)
router.post("/logout", logout)   (the user can log out)



###################### Offres ################################
router.post("/",verifyToken, createOffre);  the user (normal or entreprise can create offers)
router.delete("/:id",verifyToken, deleteOffre);   (the user can delete his offers)
router.put("/:id", verifyToken, updateOffre);   (the user can update his offers)
router.get("/single/:id", verifyToken,isEnterprise, singleOffre);   (only entreprise can get single offer details)
router.get("/", verifyToken,isEnterprise, allOffre);   (only enterprise can see all available offers)
router.get("/mine", verifyToken, myOffres)       (the user normal or enterprise can see the offers he posted)
filter offers using category , prix min , prix max , recents


###################### Propositions ################################
router.post("/propose/:id", verifyToken, isEnterprise, CreatePropostion);  (entreprise can create propositions for offers)
router.get("/", verifyToken, getMyPropositions);  (enterprises can see the proposition they sent)
router.get("/propositon/:id",verifyToken, getPropo)  (normal user or enterprise can see the proposition they recieve for an offer)


###################### users ################################
router.put("/",verifyToken, ModifyProfile)
router.delete("/del", verifyToken, deleteUser);
router.get("/",verifyToken, getUser);



###################### reviews/comment ################################
router.put("/",verifyToken, ModifyProfile)
router.delete("/del", verifyToken, deleteUser);
router.get("/",verifyToken, getUser);



////////////////////////////////
my messages
send a message/updae a message


