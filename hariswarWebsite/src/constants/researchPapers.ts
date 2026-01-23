export const researchPapers = [
  {
    id: 1,
    title: "The Progression of Home Console Operating Systems",
    description: "We researched the usage of different Operating Systems for different console game companies. With every new console generation comes the debate of which game console is the “best”. Rather than using subjective and biased opinions, we aim to explore and uncover what difference in their operating system sets them apart. We will be comparing the performance, memory management, and scheduling of each console’s Operating System. From these parts, we hope to find the reason for each console's performance and how these decisions impact the overall system performance and user satisfaction. Operating systems (OSs) serve the critical role of connecting the hardware and software of a device. As the hardware continues to improve and the needs of the software continue to rise, OSs must improve to meet these needs. The gaming industry serves as an interesting microcosm of this three-way race. By researching the three major gaming companies, Nintendo, Sony, and Microsoft, we can analyze how the progression of hardware and each company's goals impacted the OSs they designed. We found that Sony built its OSs with an emphasis on maximum performance, Microsoft built theirs off of Windows for both compatibility and ease of implementation, and Nintendo built theirs to be as minimal as possible to support cheaper and more accessible hardware.",
    image: "/osPaper.png",
    authors: ["Gavin Sutherland", "Jason Ni", "Hariswar Baburaj"],
    publicationDate: "April 2025",
    journal: "Missouri University of Science and Technology",
    keywords: ["operating system", "memory", "performance", "gaming"],
    fullContent: "",
    pdfUrl: "/FinalReport.docx.pdf"
  },
  {
    id: 2,
    title: "Analyzing the Toxicity Dataset",
    description: "Chemicals can have adverse effects on aquatic systems. A type of water flea (Daphnia magna) are often used to assess the aquatic toxicity of chemicals. The concentration of the chemical that causes death in 50% of D. magna over a duration of 48 hours is referred to as LC50. In this dataset, 350 chemicals were tested for toxicity toward D. magna and information was obtained on various properties of the chemical (called molecular descriptors). It is of interest to predict the aquatic toxicity toward D. magna by using the molecular descriptors of the chemicals. All of our 8 predictors are quantitative variable types. Our goal of this analysis and report is to predict the concentration of a given chemical that will kill 50% of the water fleas (Daphnia magna) based on molecular descriptors of the chemicals and be able to know which chemicals are more toxic to Daphnia magna than others solely based on the molecular descriptors of the chemicals. We opted to use 7 distinct statistical learning methods to this task of predicting toxicity values based on the molecular descriptors of a chemical. These methods include: Multiple Linear Regression, Polynomial Term Model, Best Subsets Model, Interaction Term Model, Lasso Regression, Principal Component Regression, Partial Least Squares Regression.", 
    image: "/Toxicity_Dataset.png",
    authors: ["Alex Djidjev", "Kyle Westwood", "Hariswar Baburaj", "Karthik Thota"],
    publicationDate: "May 2025",
    journal: "Missouri University of Science and Technology",
    keywords: ["LC50", "Toxicity", "Daphnia magna", "Molecular Descriptors", "Multiple Linear Regression","Lasso Regression", "Polynomial Term Model", "Best Subsets Model", "Interaction Term Model", "Partial Least Squares Regression","Principle Component Regression","Predictive Modeling"],
    fullContent: `Analyzing the Toxicity Dataset

By: Alex Djidjev, Kyle Westwood, Hariswar Baburaj, Karthik Thota

Introduction
Chemicals can have immense effects on aquatic systems. There is a type of water flea
calles the Daphnia magna which is used to evaluate the aquatic toxicity of chemicals. There is a
concentration of chemical called LC50 which kills 50% of test organisms over a duration of 48
hours. So, having a low LC50 means that the chemical is more toxic because a lower
concentration of it killed 50% of the animal. Having a high LC50 which means the chemical is
less toxic since a higher concentration was needed to kill 50% of the animal which means that it
is not as toxic. We have got an overall of 350 chemicals and 8 predictors for this Toxicity
Dataset.
Predictors: (molecular descriptors)
● TPSA (tot) – topological polar surface area
● SAacc – Van der Waals surface area of atoms that are acceptors of hydrogen
bonds
● H050 – number of hydrogen atoms bonded to heteroatoms
● MLOGP – octanol-water partition coefficient calculated from the Moriguchi
model
● RDCHI – topological index with information about molecular size & branching
● GATS1p – encodes information on molecular polarisability
● nN - number of nitrogen atoms present in the molecule
● C040 – number of carbon atoms of a specific type

All of our 8 predictors are quantitative variable types. Our goal of this analysis and report
is to predict the concentration of a given chemical that will kill 50% of the water fleas (Daphnia
magna) based on molecular descriptors of the chemicals and be able to know which chemicals
are more toxic to Daphnia magna than others solely based on the molecular descriptors of the
chemicals.

Methodology
We opted to use 7 distinct statistical learning methods to this task of predicting toxicity
values based on the molecular descriptors of a chemical. These methods include: Multiple Linear
Regression, Polynomial Term Model, Best Subsets Model, Interaction Term Model, Lasso
Regression, Principal Component Regression, Partial Least Squares Regression.
Furthermore, our dataset included 350 observations of chemicals, their LC50 values and
their molecular descriptor values. To accurately evaluate each model, we initially split the dataset
into a training (80%) and testing set (20%). The testing set was only used to evaluate the final
model type in each of our 7 distinct methods we chose. For example, in the Best Subsets Model,
the training set was used to determine the best predictors using cross validation (still within the
training set). After the best predictors were obtained, then that best model was evaluated on the
test set.

Exploratory Data Analysis
When performing our data analysis, we checked for a few things such as
multicollinearity, constant variance, normality, and potential outliers. First, looking at our
pairwise correlations, the highest correlation coefficient between a pair of predictors was 0.852
between TPSA and SAacc, as well as 3 separate pairs of predictors having a correlation
coefficient greater than 0.6, and 4 other pairs of predictors which had a correlation coefficient
between 0.5 and 0.6. We noticed two of our predictors have a VIF value greater than 5 where
TPSA had a VIF of 5.7, showing borderline multicollinearity, and SAacc with a VIF of 7.8,
showing a much more concerning sign of multicollinearity.

Assessing the Residuals vs. Fitted and Q-Q Residual plot, we determined that constant
variance holds as the fitted values are scattered up and below zero with no real pattern, and
normality holds even though the tail end of our points leave the line or normality slightly towards
the tail end.

Analyzing the Residuals vs. Leverage plot, we noticed there are a couple potential
outliers to the right of our leverage flag such as points 343 and 178. Finally, we have provided
scatterplots of each predictor vs. LC50 with fitted regression lines.

MLR (8 predictors)
We developed a Multiple Linear Regression model on the Toxicity dataset in order to
interpret the relationship between the response which is the LC50 and the predictors which has 8
molecular descriptors. In order to find clear information about the data, we made an MLR on the
full training dataset with 80:20 ratio split.

Based on the coefficients and the model, we were able to find the MSE on a full model
with 8 predictors which was 1.015384 squares units. The adjusted R value was 0.443 which 2
means there is an approximate 44.3% of variation in LC50 as explained by the model. The RSE
was 1.28 and the F-statistic was 28.74.
The Fitted Regression of our Model:
Ŷ = 2.559159 + 0.030196 * TPSA - 0.015602 * SAacc + 0.062558 * H050
0.478190 * MLOGP + 0.461655 * RDCHI - 0.465845 * GATS1p - 0.299422 * nN +
0.110158 * C040.
There is sufficient evidence to conclude at least one of the predictors has a significant
relationship with LC50 (2.2e-16 < 0.05 - Reject H0)

Polynomial Term Model
The polynomial term model is a model that has an added term to the model. The added
term is a predictor that is a power of one of the original predictors and is used to capture
non-linear relationships. These relationships can be quadratic, cubic, or higher-order powers.
We added polynomial terms, specifically quadratic, to the model one by one to see if any
of the polynomial terms were statistically significant to the model when added. Only one
polynomial term was statistically significant and that was RDCHI, the topological index with
information about molecular size and branching. It is the only predictor which is anywhere near
close to having a quadratic/polynomial relationship.

The p-value of I(RDCHI^2) is 0.02910, which is < 0.05, so it is statistically significant. It
was the only polynomial term that was statistically significant. The RSE is 1.219, the F-statistic
is 37.39, the P-value is < 2.2e-16, and the adjusted R
2
is 0.4841. We also plotted the predictor
RDCHI against the response LC50 on a scatter plot and used best fit linear and quadratic lines to
see which relationship the data best fitted.

The scatter plot shows that even though I(RDCHI^2) is statistically significant when
added to the model, the data still seems to follow closer to a linear relationship and isn’t exactly
quadratic. This can be seen further when looking at the graph of the test MSE vs the degree of
the polynomial for RDCHI. This was done with a validation set approach.

This graph shows the MSE values for each degree of polynomial for the predictor
RDCHI. We want a lower test MSE. When adding I(RDCHI^2) to the model, we get a test MSE
of 1.068782 squared units of LC50 as shown on the graph at degree of polynomial 2. But we
have a lower test MSE when there is no polynomial term for RDCHI, when the degree of the

polynomial is 1. So therefore, it is best not to use a polynomial term in our model, as we get the
lowest test MSE when the degree of the polynomial for RDCHI is 1.

Best Subsets Model
After the MLR with all 8 predictors was used, we decided to perform the best subsets
variable selection method. We used 5-fold CV within the training set to conduct this best subsets
selection procedure. The graph below shows the mean CV MSE values for each sized model.

As it can be seen the 4-variable model had the lowest mean CV MSE value at 1.738
squared units of LC50. Once tested on the testing set, this best subset 4-variable model obtained
a Test MSE of 1.102 squared units of LC50. We do note that this is a higher value than the
simple full MLR model. We believe that this can be attributed to the fact that we used only the
training set to perform best subsets selection and furthermore used 5-fold cross validation within
this training set to evaluate each differently-sized model.

Interaction Term Model

After performing our Best Subsets 5-fold cross validation, we took that model and made
6 new models with 6 different interactions using our 4 remaining predictors. The goal for doing
this was to see if adding an interaction term would benefit the Test MSE compared to our
original Best Subsets model. First thing we noticed is that none of the interaction terms are
significant, while Model 4 is borderline, and Model 4 also provided us our highest adjusted R .
2
After calculating each of the Test MSEs though, it seems the addition to an interaction term
lowered prediction error. Models 2, 4, 5, and 6 all returned lower Test MSEs than our original
Best Subsets model, with Model 6 providing the lowest of 1.042868, which is an improvement of
our Best Subsets Test MSE 1.102706. So, although none of our interaction terms were
significant, it proved that adding them to our model improves our Best Subsets model in terms of
prediction accuracy.

Lasso Regression
The Lasso Regression model is a commonly used shrinkage method that also has the
ability to perform variable selection due the fact that a predictor’s coefficient value is able to take
on the value of zero, unlike the Ridge Regression model. This artifact of the Lasso method was
the primary reason for choosing it as part of our analysis.
When running the model, 5-fold CV was used to determine the best value of lambda, a
hyperparameter used to control the strength of the Lasso penalty term. This value was found to
be 0.0184.
Once the optimal lambda value was found, the Lasso Regression model was fit on the
entire training set and the following coefficients values were found for each predictor:
(Intercept) TPSA SAacc H050 MLOGP RDCHI GATS1p nN C040
2.685 0.0261 -0.0121 0.00 0.456 0.466 -0.546 -0.234 -0.018

As it can be seen, the H050 (number of hydrogen atoms bonded to heteroatoms) predictor was
forced out of the model.
Lastly, when evaluating on the testing set, this model produced a Test MSE of 1.026
squared units of LC50.

Principal Component Regression (PCR)
The Principal Component Regression model is considered a dimension-reduction model.
It is based on a popular dimension-reducing visualization method called Principal Components
Analysis (PCA). Principal Component Regression works based on the idea that a smaller number
of predictors (now called principal components) will be able to explain more of the variability in
the data and the relationship with the response variable. This method relies on the critical
assumption that the directions in which the original predictor variables show the most variation
are also the directions associated with the response variable.
When running the model, the training set was first standardized and 5-fold CV was used
to determine the best number of components to use. The MSE of prediction value can be seen in
the graph below.
It can be seen that the MSE of
prediction value was the lowest
at 8 components which indicates
that this dataset is not benefiting
from the Principal Component
dimension reduction technique.
Therefore, the 8-component
Principal Component
Regression model has the exact
same coefficients as the MLR model with all 8 predictors.
Lastly, when evaluated on the testing set, the Test MSE value was 1.015 squared units of
LC50.

Partial Least Squares Regression (PLS)
After running the Principal Component Regression model and seeing unsatisfactory
results, we decided to try the Partial Least Squares Regression model as another
dimension-reduction technique. PLS is a supervised alternative to PCR as it obtains transformed
predictors by making use of the response variable, unlike PCR.
When running the model, the training set predictor values were standardized first and
5-fold CV was once again used to determine the best number of components. As it can be seen in
the graph comparing the
5-fold MSEP to the number of
components, the optimal
number of components was 5.
This is different from the
number we obtained in the
PCR model and it is
interesting to see that the
inclusion of the response
variable in calculating the new
components does yield a different result.
Furthermore, as we can see from the PLS summary R code output, the variation
explained in the response variable (within the training set) with 5 components is 45.86%, which
is not the highest, but close. The 7 and 8 component models have the highest at 45.90%.

Lastly, when evaluated on the testing set, the PLS model achieved a Test MSE of 1.000
squared units of LC50, notably lower than the PCR model.

Conclusion
The test MSE (in squared units of LC50) varied across the different models. Multiple
Linear Regression (MLR) had a test MSE of 1.015384, the Best Subsets model had a test MSE
of 1.102706, the Interaction Term model had a test MSE of 1.042868, the Polynomial Term
model had a test MSE of 1.068782, Lasso Regression had a test MSE of 1.026755, the PCR
model had a test MSE of 1.015384, same as MLR, and the PLS model had a test MSE of
1.000126.
In conclusion, our lowest test MSE model was Partial Least Squares (PLS) at 1.000126.
Our chosen model for interpretability is Multiple Linear Regression (MLR) (all 8 variables). The
MLR model had the 2nd lowest test MSE.
Looking back at the MLR model coefficients, we found that the TPSA, H050, MLOGP,
RDCHI, and C040 predictors had positive coefficients with MLOGP being the highest at
+0.478190. This indicates that keeping all other variables constant, a one unit increase in
MLOGP results in the highest increase (0.478) in LC50 value out of all the 8 predictors.
Therefore, chemicals with higher MLOGP values can be said to be less toxic. Conversely, we
found that the SAacc, GATS1p and nN predictors had negative coefficients with the GATS1p
coefficient being the most negative at -0.465845. Similarly, this indicates that keeping all other
variables constant, a one unit increase in GATS1p results in the greatest decrease (0.465) in
LC50 value out of all the 8 predictors. Thus, chemicals with higher GATS1p values can be said
to be more toxic.
This analysis serves as an excellent starting point for toxicologists to further study
molecular descriptors and their effects on the toxicity of various chemicals.
`,
    pdfUrl: "/Analyzing_the_Toxicity_Dataset.pdf"
  }, 
  {
    id: 3,
    title: "Analysis of the Effect of Ball Type and Drop Height on Maximum Rebound Height",
    description: "The objective of this experiment is to determine how ball type and drop height affect the maximum rebound height of a bouncing ball. This study will use a Completely Randomized Design (CRD) factorial experiment, with two experimental factors, each having three levels. Independent experimental units will be randomly assigned to treatment combinations, and the design will allow us to investigate both the main effects of ball type and drop height as well as any interaction between the two factors.", 
    image: "/Ball_type.png",
    authors: ["Hariswar Baburaj", "Joshua Purvis", "Parham Keshavarzi", "Karthik Thota"],
    publicationDate: "Decemeber 2025",
    journal: "Missouri University of Science and Technology",
    keywords: ["Ball type", "Height", "Maximum Rebound Height","Completely Randomized Design", "ANOVA Model", "F-test", "Tukey-Adjusted Pairwise Comparisons"],
    fullContent: "Analysis of the Effect of Ball Type and Drop Height on Maximum Rebound Height\nBy: Hariswar Baburaj, Joshua Purvis, Parham Keshavarzi, Karthik Thota\n\nIntroduction\nWe did an experiment in order to see if the ball type and drop height affect the maximum rebound height. In order to complete this experiment successfully, we set up a meter stick against the wall and secured it. Then we followed a randomized trial order and dropped specific balls from specific heights. When the drop occurs, we made sure to record the drop and rebound height in slow motion. Finally, we noted down the maximum rebound height in an excel sheet based on the resulting video. Based on the results we got, we made a Two-way ANOVA model and performed Tukey-adjusted pairwise comparisons.\n\nExperimental Design\nFor our experiment, the response variable was the maximum rebound height of the ball (cm). We had 2 factors which were the ball type and drop height with 3 levels in each of them.\nBall Type (Factor 1)                  Drop Height (Factor 2)\nLevel 1: Tennis Ball                 Level 1: 50 cm\nLevel 2: Golf Ball                   Level 2: 75 cm\nLevel 3: Ping Pong Ball              Level 3: 100 cm\n\nTreatment Combinations:\nTennis Ball with 50 cm drop\nTennis Ball with 75 cm drop\nTennis Ball with 100 cm drop\nGolf Ball with 50 cm drop\nGolf Ball with 75 cm drop\nGolf Ball with 100 cm drop\nPing Pong Ball with 50 cm drop\nPing Pong Ball with 75 cm drop\nPing Pong Ball with 100 cm drop\n\nOur controlled variables were hard tile floor, measurement method, instrument, room conditions, ball releaser, ball condition and the testing day. Our experimental and observational unit is each individual ball drop. We had 4 replicates per treatment combination with 36 total number of trials. For our randomization, we randomized the order of trials in R and our tests were conducted in the specified order.\n\nStatistical Methods\nThe statistical model is a Two-Way ANOVA in the form:\nWhat each of the terms in the model mean:\n\nThe assumptions for this model are:\nThe errors are normal, independent with constant variance.\n\nThe constraints for this model are:\nThis is required to keep the model from being over-parameterized.\n\nData Analysis Process: First, rebound height data were collected for each trial of the experiment. A Two-Way ANOVA model including the interaction between ball type and drop height was then fitted using R. A Global F-test was conducted to assess the significance of the interaction effect. If the interaction was not statistically significant, the main effects of ball type and drop height were tested. Tukey-adjusted pairwise comparisons were used to find specific differences among our treatment levels. Throughout our analysis, we used a significance level of α = 0.05.\n\nResults\nBefore testing the factorial effects, the assumptions underlying the two-way ANOVA were first evaluated. Specifically, residual diagnostics from the fitted model were examined using a Normal Q–Q plot to assess normality and a Residuals versus Fitted Values plot to assess constant variance, as shown in Fig. 1a and b. Overall, the residuals closely followed the reference line in the Q–Q plot, indicating approximate normality. In addition, the residuals were randomly scattered around zero in the residuals versus fitted plot, with no apparent pattern or funnel shape. Consequently, the assumptions of normality and homoscedasticity were considered reasonable, and no data transformation or corrective action was required.\nFig 1: Residual diagnostics for the two-way ANOVA: (a) Residuals vs fitted values and (b) Normal Q–Q plot.\n\nFurthermore, the experimental design was balanced, consisting of three ball types and three drop heights with four replicates per treatment combination, resulting in a total sample size of n = 36. This balanced structure supports the robustness of the ANOVA results.\n\nTwo-way ANOVA and interaction effects\nAfter verifying the model assumptions, a Type I (sequential) two-way ANOVA was conducted to examine the effects of ball type, drop height, and their interaction on maximum rebound height at a significance level of α = 0.05. The ANOVA results are summarized in Table 1.\n\nHere is the hypothesis for interaction:\nH0: (αβ)ij = 0 for all i,j\nHa: (αβ)ij ≠ 0 for at least one pair (i,j)\n\nTable 1: Type I two-way ANOVA results for rebound height.\n\nSince the interaction between ball type and drop height was statistically significant, F(4, 27) = 17.44, p = 3.52 × 10^-7 < 0.05. As a result, the null hypothesis was rejected, demonstrating that the effect of drop height on rebound height depends on the type of ball.\n\nThis interaction is further supported by the interaction plot shown in Fig. 2. In this plot, the mean rebound-height lines across drop heights are non-parallel for different ball types, visually confirming that the relationship between drop height and rebound height varies among balls. Therefore, both factors jointly influence rebound behavior.\n\nFig 2: Interaction plot of mean rebound height versus drop height for each ball type.\n\nTukey-adjusted pairwise comparisons\nFollowing the significant Ball Type × Drop Height interaction observed in the two-way ANOVA, Tukey-adjusted pairwise comparisons were conducted within each drop height to examine differences among ball types while controlling the family-wise error rate at α = 0.05. The results of these comparisons are presented in Table 2 and are interpreted separately for each drop height.\n\nAt a drop height of 50 cm, none of the pairwise comparisons among golf, ping pong, and tennis balls were statistically significant (all adjusted p-values > 0.05). This indicates that, at the lowest drop height, rebound heights did not differ significantly across ball types.\n\nAt a drop height of 75 cm, statistically significant differences were observed among all ball types. Ping pong balls rebounded significantly higher than golf balls (difference = 6.25 cm, p < 0.0001) and tennis balls (difference = 9.50 cm, p < 0.0001). In addition, golf balls rebounded significantly higher than tennis balls (difference = 3.25 cm, p = 0.0078). These results indicate a clear ordering of rebound performance at 75 cm, with ping pong balls exhibiting the highest rebound, followed by golf balls, and then tennis balls.\n\nAt a drop height of 100 cm, golf balls rebounded significantly higher than both ping pong balls (difference = 4.00 cm, p = 0.0011) and tennis balls (difference = 4.50 cm, p = 0.0003). However, no statistically significant difference was observed between ping pong and tennis balls at this height (difference = 0.50 cm, p = 0.8697). This suggests that, at the highest drop height, golf balls exhibit superior rebound performance, while ping pong and tennis balls behave similarly.\n\nOverall, these height-specific Tukey comparisons further confirm the presence of a significant interaction effect. Specifically, the relative rebound performance of the ball types changes with drop height, demonstrating that the effect of ball type on rebound height depends strongly on the drop height.\n\nTable 2: Tukey-adjusted pairwise comparisons of ball types within each drop height.\n\nConclusion\nBased on the results, drop height significantly affects the rebound height for all ball types. Higher drops produced higher rebounds. The ball type also affected the rebound height where the effect depends on the drop height (significant interaction). A challenge we had while conducting this experiment was the room lighting in the room we did the experiment making the video a bit unclear and so we addressed this by using a phone flashlight to illuminate the trial area. Another challenge we had while conducting this experiment was having consistent ball drops so we addressed this by making sure to practice the procedure before running the trials and also by having the same person release the ball in all of the trials. Some potential improvements were to use a non-human mechanism to perfectly drop the ball and not have human error, a fixed stand to hold the recording device to ensure consistent readings and not have human error, and also just add more replicates per treatment.", 
    pdfUrl: "/STATS5353-Report.pdf"
  },
  {
    id: 4,
    title: "Microcontrollers in Smartwatches (Apple Watch, Fitbit, Samsung Galaxy)",
    description: "Researching and analyzing the microcontrollers that is used in Smartwatches especially with Apple Watch, Fitbit and Samsung Galaxy.",  
    image: "/micro.png",
    authors: ["Hariswar Baburaj"],
    publicationDate: "September 2025",
    journal: "Missouri University of Science and Technology",
    keywords: ["Microcontrollers", "Smartwatches", "Fitbit", "Apple Watch", "Samsung Galaxy"],
    fullContent: "Introduction:\nIn our daily life, we have been using all sorts of products throughout the day and the main one is watches. Especially, when the technology has been developing and the number of smartwatches being bought and created is also skyrocketing. According to Boettcher, watches were first introduced in Europe during the thirteenth century named Mechanical Clock [1]. As the world evolved with technologies, the watches also made their evolution from being mechanical to smartwatches. In the early ages, the usage of watches was just for checking time but time has evolved now. There are so many features being added using advanced technology, microcontrollers and other mechanisms in order to develop unique components such as heart rate check and monitoring human health. In order to successfully implement watches like Apple, Fitbit and Samsung Galaxy, we need the services of microcontrollers which play a major role in managing sensors like the heart rate, batteries and monitoring time. In this paper, we will be discussing the types of microcontrollers being used in smartwatches such as Apple, Fitbit and Samsung Galaxy. We will go through their purpose, performance, and the impact microcontrollers have in smart watches and how they play a major role in introducing successful smartwatches to society.\n\nSummary of References:\nApple:\nApple is one of the biggest global market companies and has been involved in developing all sorts of technologies such as Iphones, Macbook and watches. Apple started to reveal their ideas and watch products to the world in early 2015 with showing their first ever apple watch. In order to implement the Apple Watch successfully, the company needed the services of a microcontroller in order to create unique and better features. Apple utilizes the ST32 microcontroller in order to control sensors and other features including batteries and interactive displays in smartwatches [2]. Basically, microcontrollers help to read data and information from sensors and send them directly to the processor which makes signals and gives the connection to the heart rate when it's being connected to the humans. So for example, when we run or exercise the microcontroller stored inside the apple watch collects the data from our movement and utilizes it to determine accurate results such as the amount of calories burned by us and the exact heart rate for that specific time. So, without a microcontroller, the Apple watch won’t be able to track our health and won’t have any interaction features in them which is essential and needed for companies in order to make the watches unique from their competitors.\n\nFitbit:\nFitbit is a modern watch which is primarily used to monitor things related to health which includes the heart rate, amount of walking steps per day and other fitness related activities. In order to implement fitbit, it is being created with ST Microelectronics STM32L151C6 microcontrollers which is technically an 32-bit microcontroller with an important mechanism of ARM cortex - M3 core imported in the fitbit [3]. There are key main services that would be impacted if there is not a quality microcontroller which are the sensors, batter power and bluetooth radio. Sensors are a really key feature in smartwatches such as fitbit since it really helps the person wearing it to track their heart rates and the amount of steps. Microcontrollers also help to save the power of the battery that is being used by the buyers and provide them a quality battery life rather than getting damaged in the early stages. In terms of bluetooth, they utilize the microcontroller in order to communicate with the Fitbit app and make sure the battery doesn’t drain quickly. So overall, the microcontroller in fitbit plays an important role in keeping the fitbit watch secure and maintained properly which provides a quality service for customers that are purchasing fitbit.\n\nSamsung Galaxy:\nSamsung is also one of the largest global market companies and the major competitor of Apple in all sorts of technologies. They both are the competitors for phones, laptops, computers, tabs and smartwatches. In terms of the smartwatches, Samsung uses Samsung Exynos multiprocessors which helps them with Wifi, location and bluetooth. So the smartwatches don't need that much power compared to other technologies that Samsung makes. So the Exynos processor plays a huge part in terms of graphic processing with the 64 bit multicore CPU in order to have better performance and be efficient [4]. It is also similar to other companies where the multiprocessor helps them with tracking heart rate and sleep monitoring. It also enhances the user's experience with calls, texts, bluetooth connections and more in order to keep the buyers engaged while using the Samsung smartwatch. Samsung is also using advanced and more powerful multiprocessors in latest generation smartwatches and planning to use them in the upcoming ones as well. The features they are planning to add on is that the users can access applications through visual interfaces and keep them engaged. Overall, Samsung also uses powerful multiprocessors in order to give one of the best experiences for the users of Samsung galaxy smartwatch.\n\nDiscussion:\nSmartwatches have been a regular usage for most people in this era which helps them save time in regard to checking their health, where you get an instant update on your heart rate, and steps check. Specifically, In my daily life the existence of microcontrollers in smartwatches plays a massive role since it checks health, helps me to manage my time well and efficiently. With regard to the importance of microcontrollers, it’s the device that works behind the display in order to track my heart rate and step count with a sensor when I go swimming or go for a run in the evening. It keeps me actively engaged and also provides me some motivation to be disciplined and follow a healthy life. Overall, microcontrollers are really important for me, especially in smartwatches in order to keep me active, engaged and in a healthy lifestyle.\n\nConclusion:\nIn conclusion, microcontrollers play a very important role in the field of smartwatches now and also in the future as technology advances to another level. Without quality microcontrollers, smartwatches won’t be able to track sensors accurately which includes heart rates, sleep patterns and might have problems with battery draining so fast. They behave like the brain of smartwatches which connects to many other parts and gives energy in order to keep them active. Overall, microcontrollers enable smartwatches to work efficiently and accurately in order to satisfy the buyers expectations from the smart watches.",
    pdfUrl: "/Microcontrollers_Smartwatches.pdf"
  }
]