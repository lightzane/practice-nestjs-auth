import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) { // by default, name = 'jwt' (if 2nd arg not provided in PassportStrategy) 
    constructor() {
        // context will come from the jwt.guard.ts
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ! Authorization headers are injected via middleware
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    /**
     * Every passport has a 'validate()' method
     * Validates the Jwt token from bearer
     * @param payload the decoded JSON
     * @returns Jwt Details
     */
    validate(payload: any) {
        return payload; // returns back to the jwt.guard.ts and can be accessed via handleRequest()
    }
}